import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SupabaseProvider } from './integrations/supabase/index.js'

console.log('Starting rendering process...');

console.log('Creating root element...');
const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

console.log('Initializing ReactDOM root...');
const root = ReactDOM.createRoot(rootElement);
console.log('ReactDOM root initialized:', root);

console.log('Rendering SupabaseProvider and App components...');
root.render(
  <SupabaseProvider>
    <App />
  </SupabaseProvider>
);
console.log('Rendering process completed.');
