import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {
  const [counts, setCounts] = useState({ PET: 0, HDP: 0, glass: 0, carton: 0 });
  const commands = [
    {
      command: 'start counting',
      callback: () => console.log('Counting started')
    },
    {
      command: 'count *',
      callback: (type) => {
        if (counts.hasOwnProperty(type)) {
          setCounts(prevCounts => ({ ...prevCounts, [type]: prevCounts[type] + 1 }));
        }
      }
    },
    {
      command: 'reset *',
      callback: (type) => {
        if (counts.hasOwnProperty(type)) {
          setCounts(prevCounts => ({ ...prevCounts, [type]: 0 }));
        }
      }
    }
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

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
    </div>
  );
}

export default App;