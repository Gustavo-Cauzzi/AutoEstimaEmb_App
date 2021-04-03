import React from 'react';
import ReactDOM from 'react-dom';
import ContextProvider from './hooks';
import Dashboard from './pages/Dashboard';
import GlobalStyles from './styles/global';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />

    <ContextProvider>
      <Dashboard />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);