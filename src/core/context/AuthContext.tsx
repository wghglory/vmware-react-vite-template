import {createContext, useCallback, useContext, useEffect, useMemo, useReducer} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import http from '@/utils/axios';

import {ACCESS_TOKEN} from '../const';
import {RoutePath} from '../const/routePath';
import {SignInPayload, SignInResponse, User} from '../models/user';
import {AuthActionTypes, authReducer} from './AuthReducer';
import {AuthState, initialState} from './AuthState';

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const location = useLocation();
  const navigate = useNavigate();

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

        const {data: session, headers} = await http.post<SignInResponse>('/session', payload);

        const token = session.user.token; // headers[ACCESS_TOKEN];
        localStorage.setItem(ACCESS_TOKEN, token);

        dispatch({
          type: AuthActionTypes.SignInSuccess,
          payload: {...session.user, id: session.user.username},
          meta: {token},
        });

        // TODO: update defaultPath
        const defaultPath = ['SYSTEM_OPERATOR', 'PROVIDER_ADMIN'].includes(session.user.role)
          ? RoutePath.operator
          : ['TENANT_USER', 'TENANT_ADMIN'].includes(session.user.role)
          ? RoutePath.tenant
          : '/';

        // (location.state as any)?.from means user accessed protected pages, but probably token expires
        const from = (location.state as any)?.from || defaultPath; // usually we jump to /

        navigate(from, {replace: true});
      } catch (error: any) {
        dispatch({type: AuthActionTypes.SignInFailure, error: error.data});
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location, navigate],
  ); // TODO: navigate will make function not unique... ADD navigate back to deps. VERIFY ANY BUG?

  const getUser = useCallback(async (token: string) => {
    try {
      dispatch({type: AuthActionTypes.GetCurrentUserInit, meta: {token}});

      const {data: user} = await http.get<User>('/current-user');

      dispatch({
        type: AuthActionTypes.GetCurrentUserSuccess,
        payload: user,
        meta: {token},
      });
    } catch (error: any) {
      navigate(RoutePath.signIn);

      localStorage.removeItem(ACCESS_TOKEN);

      dispatch({
        type: AuthActionTypes.GetCurrentUserFailure,
        error: error.data,
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
    () => ({user, status, error, token, signOut, signIn, getUser}),
    [user, status, error, token, signOut, signIn, getUser],
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
