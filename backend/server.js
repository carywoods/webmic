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

// Define the port (use the value from environment variables or default to 5000)
const PORT = process.env.PORT || 5000;

// Define the root route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Define the /send-email route
app.post('/send-email', (req, res) => {
  const { userEmail, webcamStatus, micStatus } = req.body;

  // Email options
  const msg = {
    to: [userEmail, 'your-email@gmail.com'],
    from: 'your-email@gmail.com', // Verified SendGrid sender
    subject: 'Webmic Test Results',
    text: `Here are the results of your device test:\n\nWebcam Status: ${webcamStatus}\nMicrophone Status: ${micStatus}`
  };

  // Send email
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
