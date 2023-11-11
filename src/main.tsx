import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import ApiProvider from './service/api.tsx';

import App from './App.tsx';
import { theme } from './assets/theme.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <ApiProvider>
          <App />
        </ApiProvider>
      </ThemeProvider>
    </CssBaseline>
  </React.StrictMode>,
);
