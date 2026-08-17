import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import 'safira-ui/styles.css';
import './globals.css';
import { AuthProvider, Providers } from './providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Providers>
        <App />
      </Providers>
    </AuthProvider>
  </StrictMode>,
);
