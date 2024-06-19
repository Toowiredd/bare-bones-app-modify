import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SupabaseProvider } from '/src/integrations/supabase/index.js';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <SupabaseProvider>
        <App />
      </SupabaseProvider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
