import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {BrowserRouter} from 'react-router-dom';

import {AuthProvider} from './AuthContext';
import {AuthState} from './AuthState';
import {ThemeProvider} from './ThemeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry(failureCount, error: any) {
        if (error.status === 404) return false;
        // retry once
        else if (failureCount < 1) return true;
        else return false;
      },
    },
  },
});

function AppProviders({children}: {children: React.ReactNode}) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export {AppProviders};
