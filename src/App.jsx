import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {
  const [counts, setCounts] = useState({ PET: 0, HDP: 0, glass: 0, carton: 0 });
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('all');

  const commands = [
    {
      command: 'start counting',
      callback: () => console.log('Counting started')
    },
    {
      command: 'count *',
      callback: (type) => {
        if (counts.hasOwnProperty(type)) {
          const newCounts = { ...counts, [type]: counts[type] + 1 };
          setCounts(newCounts);
          setHistory([...history, { type, count: newCounts[type], timestamp: new Date().toLocaleString() }]);
        }
      }
    },
    {
      command: 'reset *',
      callback: (type) => {
        if (counts.hasOwnProperty(type)) {
          const newCounts = { ...counts, [type]: 0 };
          setCounts(newCounts);
          setHistory([...history, { type, count: 0, timestamp: new Date().toLocaleString() }]);
        }
      }
    }
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const clearHistory = () => {
    setHistory([]);
  };

  const filteredHistory = filter === 'all' ? history : history.filter(entry => entry.type === filter);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">Voice-Activated Counting</h1>
      <p className="text-lg text-gray-700 mb-4">This app recognizes voice commands to count different types of containers.</p>
      <button
        className="btn btn-primary mb-4"
        onClick={SpeechRecognition.startListening}
      >
        Start Listening
      </button>
      <button
        className="btn btn-secondary mb-4"
        onClick={SpeechRecognition.stopListening}
      >
        Stop Listening
      </button>
      <button
        className="btn btn-danger mb-4"
        onClick={resetTranscript}
      >
        Reset Transcript
      </button>
      <div className="text-lg text-gray-700 mb-4">Transcript: {transcript}</div>
      <div className="text-lg text-gray-700 mb-4">Counts:</div>
      <ul>
        {Object.keys(counts).map((key) => (
          <li key={key} className="text-lg text-gray-700">{key}: {counts[key]}</li>
        ))}
      </ul>
      <div className="text-lg text-gray-700 mb-4">History:</div>
      <div className="mb-4">
        <label className="mr-2">Filter by type:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="select select-bordered">
          <option value="all">All</option>
          {Object.keys(counts).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>
      <button
        className="btn btn-warning mb-4"
        onClick={clearHistory}
      >
        Clear History
      </button>
      <ul>
        {filteredHistory.map((entry, index) => (
          <li key={index} className="text-lg text-gray-700">{entry.timestamp} - {entry.type}: {entry.count}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;