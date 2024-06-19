import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SupabaseProvider } from '/src/integrations/supabase/index.js';

console.log("Main component rendered");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <SupabaseProvider>
         <App />
       </SupabaseProvider>
     </React.StrictMode>,
)
