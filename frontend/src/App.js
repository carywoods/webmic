import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [webcamStatus, setWebcamStatus] = useState('Not Tested');
  const [micStatus, setMicStatus] = useState('Not Tested');

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axios.get('https://webmic.onrender.com/');
        console.log('Test Connection Successful:', response.data);
      } catch (error) {
        console.error('Error testing connection:', error);
      }
    };
    testConnection();
  }, []);

  const handleSendResults = async () => {
    const data = {
      userEmail,
      webcamStatus: 'Webcam working',
      micStatus: 'Microphone working'
    };

    try {
      const response = await axios.post('https://webmic.onrender.com/send-email', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Email sent successfully:', response.data);
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      if (error.response) {
        console.error('Error response from server:', error.response.data);
        alert(`Failed to send email: ${error.response.data}`);
      } else if (error.request) {
        console.error('No response received from server:', error.request);
        alert('Failed to send email: No response received from server');
      } else {
        console.error('Error setting up the request:', error.message);
        alert('Failed to send email: An unexpected error occurred');
      }
    }
  };

  return (
    <div className="App" style={{ backgroundColor: '#f0f8ff' }}>
      <header className="App-header">
        <h1>Webmic Frontend - Version with Fresh Color</h1>
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
