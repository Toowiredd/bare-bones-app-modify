import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SupabaseProvider } from './integrations/supabase/index.js'

console.log('Starting rendering process...');

ReactDOM.createRoot(document.getElementById('root')).render(
  <SupabaseProvider>
    <App />
  </SupabaseProvider>
);

console.log('Rendering process completed.');
