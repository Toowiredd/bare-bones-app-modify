import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import CounterPage from './pages/CounterPage';
import SettingsPage from './pages/SettingsPage';
import DebuggingPage from './pages/DebuggingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <nav className="w-full bg-gray-800 p-4">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link to="/" className="text-white">Home</Link>
            </li>
            <li>
              <Link to="/counter" className="text-white">Counter</Link>
            </li>
            <li>
              <Link to="/settings" className="text-white">Settings</Link>
            </li>
            <li>
              <Link to="/debugging" className="text-white">Debugging</Link>
            </li>
          </ul>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/counter" element={<CounterPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/debugging" element={<DebuggingPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;