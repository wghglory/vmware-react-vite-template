import {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';

import Layout from '@/core/components/Layout';
import RequireAuth from '@/core/components/RequireAuth';
import {RoutePath} from '@/core/const/routePath';

import HomePage from './pages/HomePage';
import NoAccessPage from './pages/NoAccessPage';
import NotFoundPage from './pages/NotFoundPage';
import OperatorPage from './pages/OperatorPage';
import ProviderPage from './pages/ProviderPage';
import PublicPage from './pages/PublicPage';
import SignInPage from './pages/SignInPage';
import TenantPage from './pages/TenantPage';

const PlaygroundPage = lazy(() => import('./pages/PlaygroundPage'));
const ReactDataTablePage = lazy(() => import('./pages/ReactDataTablePage'));

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={RoutePath.root} element={<HomePage />} />
        <Route path={RoutePath.public} element={<PublicPage />} />

        <Route
          path={RoutePath.operator}
          element={
            <RequireAuth roles={['SYSTEM_OPERATOR']}>
              <OperatorPage />
            </RequireAuth>
          }
        />
        <Route
          path={RoutePath.provider}
          element={
            <RequireAuth roles={['PROVIDER_ADMIN']}>
              <ProviderPage />
            </RequireAuth>
          }
        />
        <Route
          path={RoutePath.tenant}
          element={
            <RequireAuth roles={['TENANT_USER', 'TENANT_ADMIN']}>
              <TenantPage />
            </RequireAuth>
          }
        />
        <Route
          path="/play"
          element={
            <Suspense fallback={<div className="h-screen"></div>}>
              <PlaygroundPage />
            </Suspense>
          }
        />
        <Route
          path="/datagrid"
          element={
            <Suspense fallback={<div className="h-screen"></div>}>
              <ReactDataTablePage />
            </Suspense>
          }
        />

        <Route path={RoutePath.noAccess} element={<NoAccessPage />} />
        <Route path={RoutePath.notFound} element={<NotFoundPage />} />
      </Route>

      <Route path={RoutePath.signIn} element={<SignInPage />} />
    </Routes>
  );
}

export default App;
