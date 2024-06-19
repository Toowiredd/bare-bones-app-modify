import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';

const DebuggingPage = () => {
  console.log("DebuggingPage component rendered");

  const [logs, setLogs] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate log capture
    const interval = setInterval(() => {
      const newLog = { level: 'info', message: 'Sample log message', timestamp: new Date().toISOString() };
      setLogs((prevLogs) => [...prevLogs, newLog]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const captureLog = (log) => {
    setLogs([...logs, log]);
  };

  const runTest = async () => {
    // Placeholder for test conduction logic
    const result = { testName: 'Sample Test', status: 'Passed', timestamp: new Date().toISOString() };
    setTestResults([...testResults, result]);
    setNotifications([...notifications, { message: 'Test completed successfully', type: 'success' }]);
  };

  const exportLogs = () => {
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
    saveAs(blob, 'logs.json');
  };

  const filteredLogs = logs.filter(log => filter === 'all' || log.level === filter);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Debugging and Log Capture</h1>
      <div className="mb-4">
        <button onClick={runTest} className="px-4 py-2 bg-blue-500 text-white rounded">Run Test</button>
        <button onClick={exportLogs} className="px-4 py-2 bg-green-500 text-white rounded ml-2">Export Logs</button>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Logs</h2>
        <div className="mb-2">
          <label htmlFor="filter" className="mr-2">Filter:</label>
          <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="px-2 py-1 border rounded">
            <option value="all">All</option>
            <option value="info">Info</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
          </select>
        </div>
        <ul className="list-disc pl-5">
          {filteredLogs.map((log, index) => (
            <li key={index}>{`${log.timestamp} - ${log.level.toUpperCase()}: ${log.message}`}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Test Results</h2>
        <ul className="list-disc pl-5">
          {testResults.map((result, index) => (
            <li key={index}>{`${result.testName} - ${result.status} at ${result.timestamp}`}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Notifications</h2>
        <ul className="list-disc pl-5">
          {notifications.map((notification, index) => (
            <li key={index} className={`text-${notification.type === 'success' ? 'green' : 'red'}-500`}>{notification.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DebuggingPage;