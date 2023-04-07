import React from 'react';
import ReactDOM from 'react-dom/client';

import AppProvider from './appContext/AppProvider';

import App from './App';
import GlobalStyles from '../public/styles/GlobalStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AppProvider>
      <GlobalStyles />
      <App />
    </AppProvider>
  </React.StrictMode>
);
