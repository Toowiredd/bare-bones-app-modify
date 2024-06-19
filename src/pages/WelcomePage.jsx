import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">Welcome to the Counting App</h1>
      <p className="text-lg text-gray-700 mb-6">This app helps you count keywords in audio streams. Navigate through the app to start counting, view settings, and more.</p>
      <div className="flex space-x-4">
        <Link to="/counter" className="px-4 py-2 bg-blue-500 text-white rounded">Go to Counter</Link>
        <Link to="/settings" className="px-4 py-2 bg-green-500 text-white rounded">Go to Settings</Link>
      </div>
    </div>
  );
};

export default WelcomePage;