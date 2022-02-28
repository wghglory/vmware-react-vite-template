import {useEffect} from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';

import {ACCESS_TOKEN} from '@/const';
import {useAuth} from '@/context/AuthContext';
import {Role} from '@/models';

import AppLoading from './AppLoading';

export default function RequireAuth({roles, children}: {roles: Role[]; children: JSX.Element}) {
  const {user, status} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // if there's no token, kick to sign in
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      navigate('/sign-in', {state: {from: location}});
      return;
    }
  }, [location, navigate]);

  // if landing / refreshing a protected page, display loading first
  if (status === 'default' || status === 'loading') {
    return <AppLoading />;
  }

  // if user cannot be retrieved, kick to sign in
  if (user === null) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/sign-in" state={{from: location}} />;
  }

  // if user role is not enough, kick to access
  if (!roles.includes(user.role)) {
    // user role doesn't match route path,
    // e.g. normal user accessed admin-only page. 403
    return <Navigate to="/no-access" />;
  }

  // everything good
  return children;
}
