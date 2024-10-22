// Import required modules
const axios = require('axios');

// JavaScript version of the cURL test
const sendTestEmail = async () => {
  const data = {
    userEmail: 'twginc@gmail.com',
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
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error('Error response from server:', error.response.data);
    } else if (error.request) {
      console.error('No response received from server:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
  }
};

// Call the function to test the email sending
sendTestEmail();

