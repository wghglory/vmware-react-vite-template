import {createContext, useCallback, useContext, useEffect, useMemo, useReducer} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {ACCESS_TOKEN} from '@/const';
import {SignInPayload, User} from '@/models';
import http from '@/utils/axios';

import {AuthActionTypes, authReducer} from './AuthReducer';
import {AuthState, initialState} from './AuthState';

export function AuthProvider({children, value}: {children: React.ReactNode; value?: AuthState}) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const location = useLocation();
  const navigate = useNavigate();

  const from = (location.state as any)?.from?.pathname || '/'; // usually we jump to /

  // const pathRef = useRef(location.pathname);
  // const from = (location.state as any)?.from || '/';

  const signOut = useCallback(async () => {
    try {
      await http.delete('/session');

      localStorage.removeItem(ACCESS_TOKEN);

      dispatch({type: AuthActionTypes.SignOut});
    } catch (err) {
    } finally {
      window.location.href = '/';
    }
  }, []);

  const signIn = useCallback(
    async (payload: SignInPayload) => {
      try {
        dispatch({type: AuthActionTypes.SignInInit});

        console.log(payload);

        const {data: session, headers} = await http.post<{id: string; user: User}>('/session', payload);

        const token = headers[ACCESS_TOKEN];
        localStorage.setItem(ACCESS_TOKEN, token);

        dispatch({type: AuthActionTypes.SignInSuccess, payload: session.user, meta: {token}});

        navigate(from, {replace: true});
      } catch (error) {
        dispatch({type: AuthActionTypes.SignInFailure, error});
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [from],
  ); // navigate will make function not unique...

  const getUser = useCallback(async (token: string) => {
    try {
      dispatch({type: AuthActionTypes.GetCurrentUserInit, meta: {token}});

      const {data: user} = await http.get<User>('/current-user');

      dispatch({
        type: AuthActionTypes.GetCurrentUserSuccess,
        payload: user,
        meta: {token},
      });
    } catch (error) {
      navigate('/sign-in');

      localStorage.removeItem(ACCESS_TOKEN);

      dispatch({
        type: AuthActionTypes.GetCurrentUserFailure,
        error,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // same issue, cannot include navigate...

  useEffect(() => {
    // if there's a token, get current user
    const token = localStorage.getItem(ACCESS_TOKEN);
    token && getUser(token);
  }, [getUser]);

  const {user, status, error, token} = state;

  const v = useMemo(
    () => ({user, status, error, token, ...value, signOut, signIn, getUser}),
    [user, status, error, token, value, signOut, signIn, getUser],
  );

  return <AuthContext.Provider value={v}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

// -------------------- below: types, reducers, actions, context initializer ------------------

type AuthContextState = AuthState & {
  signIn: (payload: SignInPayload) => Promise<void>;
  getUser: (token: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextState>(initialState as AuthContextState);
AuthContext.displayName = 'AuthContext';
