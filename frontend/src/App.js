import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [webcamStatus, setWebcamStatus] = useState('Not Tested');
  const [micStatus, setMicStatus] = useState('Not Tested');
  const [userEmail, setUserEmail] = useState('');

  const handleTestWebcam = () => {
    // Placeholder for webcam testing logic
    setWebcamStatus('Webcam working');
  };

  const handleTestMicrophone = () => {
    // Placeholder for microphone testing logic
    setMicStatus('Microphone working');
  };

  const handleSendResults = () => {
    const data = {
      userEmail,
      webcamStatus,
      micStatus
    };

    axios.post('http://localhost:5000/send-email', data)
      .then(response => {
        alert('Email sent successfully!');
      })
      .catch(error => {
        console.error('Error sending email:', error);
        alert('Failed to send email');
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Webmic Frontend</h1>
        <button onClick={handleTestWebcam}>Test Webcam</button>
        <p>Webcam Status: {webcamStatus}</p>
        <button onClick={handleTestMicrophone}>Test Microphone</button>
        <p>Microphone Status: {micStatus}</p>
        <input
          type="email"
          placeholder="Enter your email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button onClick={handleSendResults}>Send Test Results</button>
      </header>
    </div>
  );
}

export default App;
