// Import required modules
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
require('dotenv').config(); // Load environment variables from .env file

// Create an instance of Express
const app = express();

// Middleware
app.use(cors({ origin: 'https://webmic.onrender.com' })); // Allow requests from frontend URL
app.use(express.json()); // Parse JSON bodies

// Set up SendGrid API key from environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Define the port (use the value from environment variables or default to 10000)
const PORT = process.env.PORT || 10000;

// Define the root route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Define the /send-email route
app.post('/send-email', (req, res) => {
  const { userEmail, webcamStatus, micStatus } = req.body;

  console.log('Received POST request at /send-email');
  console.log('Request Body:', req.body);

  if (!userEmail || !webcamStatus || !micStatus) {
    console.error('Missing required fields in request body');
    return res.status(400).send('Missing required fields in request body');
  }

  // Email options
  const msg = {
    to: userEmail, // Recipient's email
    from: 'your-verified-email@domain.com', // Verified sender email from SendGrid
    subject: 'Webmic Test Results',
    text: `Here are the results of your device test:\n\nWebcam Status: ${webcamStatus}\nMicrophone Status: ${micStatus}`,
    html: `<strong>Here are the results of your device test:</strong><br><br>Webcam Status: ${webcamStatus}<br>Microphone Status: ${micStatus}`
  };

  console.log('Attempting to send email with SendGrid');
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent successfully');
      res.send('Email sent successfully');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      res.status(500).send(`Failed to send email: ${error.message}`);
    });
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
