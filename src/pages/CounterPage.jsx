import React, { useState } from 'react';

const CounterPage = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0, 0]);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleIncrement = (index) => {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);
  };

  const handleDecrement = (index) => {
    const newCounts = [...counts];
    newCounts[index] -= 1;
    setCounts(newCounts);
  };

  const handleStartStopCapture = () => {
    setIsCapturing(!isCapturing);
  };

  const totalCount = counts.reduce((acc, count) => acc + count, 0);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Counter Page</h1>
      <div className="mb-4">
        <button onClick={handleStartStopCapture} className="px-4 py-2 bg-blue-500 text-white rounded">
          {isCapturing ? 'Stop Capture' : 'Start Capture'}
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {counts.map((count, index) => (
          <div key={index} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold">Container {index + 1}</h2>
            <p className="text-lg">Count: {count}</p>
            <div className="flex space-x-2 mt-2">
              <button onClick={() => handleIncrement(index)} className="px-2 py-1 bg-green-500 text-white rounded">+</button>
              <button onClick={() => handleDecrement(index)} className="px-2 py-1 bg-red-500 text-white rounded">-</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold">Total Count</h2>
        <p className="text-lg">{totalCount}</p>
      </div>
    </div>
  );
};

export default CounterPage;