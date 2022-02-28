import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import {i18nClient} from '@/i18n/i18nClient';

(async () => {
  await i18nClient.coreService.loadI18nData();
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
})();
