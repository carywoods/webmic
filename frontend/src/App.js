import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const [webcamStatus, setWebcamStatus] = useState('Not Tested');
  const [micStatus, setMicStatus] = useState('Not Tested');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Request access to the user's webcam
    async function startVideo() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setWebcamStatus('Webcam working');
      } catch (error) {
        console.error('Error accessing webcam:', error);
        setWebcamStatus('Webcam test failed: ' + error.message);
      }
    }
    startVideo();
  }, []);

  const handleTestMicrophone = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStatus('Microphone working');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setMicStatus('Microphone test failed: ' + error.message);
    }
  };

  const handleSendResults = () => {
    const data = {
      userEmail,
      webcamStatus,
      micStatus,
    };

    axios.post('https://webmic.onrender.com/send-email', data)
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
        <div>
          <video ref={videoRef} autoPlay playsInline style={{ width: '400px', height: '300px' }} />
          <p>Webcam Status: {webcamStatus}</p>
        </div>
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
