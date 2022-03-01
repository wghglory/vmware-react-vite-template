import {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';

import Layout from './components/common/Layout';
import RequireAuth from './components/common/RequireAuth';
import HomePage from './pages/HomePage';
import NoAccessPage from './pages/NoAccessPage';
import NotFoundPage from './pages/NotFoundPage';
import OperatorPage from './pages/OperatorPage';
import ProviderPage from './pages/ProviderPage';
import PublicPage from './pages/PublicPage';
import SignInPage from './pages/SignInPage';
import TenantPage from './pages/TenantPage';

const PlaygroundPage = lazy(() => import('./pages/PlaygroundPage'));
const ReactTablePage = lazy(() => import('./pages/ReactDataTablePage'));
const DatagridPage = lazy(() => import('./pages/DatagridPage'));

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/public" element={<PublicPage />} />
        <Route
          path="/operator"
          element={
            <RequireAuth roles={['SYSTEM_OPERATOR']}>
              <OperatorPage />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/provider"
          element={
            <RequireAuth roles={['PROVIDER_ADMIN']}>
              <ProviderPage />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/tenant"
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
          path="/react-table"
          element={
            <Suspense fallback={<div className="h-screen"></div>}>
              <ReactTablePage />
            </Suspense>
          }
        />
        <Route
          path="/datagrid"
          element={
            <Suspense fallback={<div className="h-screen"></div>}>
              <DatagridPage />
            </Suspense>
          }
        />

        <Route path="/no-access" element={<NoAccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/sign-in" element={<SignInPage />} />
    </Routes>
  );
}

export default App;
