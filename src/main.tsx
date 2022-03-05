import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {AppProviders} from './core/context';
import {i18nClient} from './i18n/i18nClient';

async function prepare() {
  await i18nClient.coreService.loadI18nData();

  // 1. check VITE_APP_HOST, only when it's empty string, the worker can be started
  // 2. jest testing will start Server instead of worker (test/jest.setup.ts)
  // 3. cypress currently runs below worker, the issue is with worker started, interceptor won't work...
  // 4. if not hoping to run worker, do this, "test:e2e:dev": "npm run dev -- --mode=test & npm run cy:open" will execute `vite --mode=test` and process.env.NODE_ENV='test'
  if (process.env.NODE_ENV === 'development' && import.meta.env.VITE_APP_HOST === '') {
    const {worker} = await import('./mocks/browser');
    return worker.start();
  }
  return Promise.resolve();
}

prepare().then(() => {
  ReactDOM.render(
    <AppProviders>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AppProviders>,
    document.getElementById('root'),
  );
});
