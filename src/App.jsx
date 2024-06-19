import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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
              <Link to="/debugging" className="text-white">Debugging</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
              <h1 className="text-5xl font-bold mb-4">Welcome to Bare Bones App</h1>
              <p className="text-lg text-gray-700">This is a minimalistic application structure that you can modify and build upon.</p>
            </div>
          } />
          <Route path="/debugging" element={<DebuggingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;