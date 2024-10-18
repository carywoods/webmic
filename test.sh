curl -X POST https://webmic.onrender.com/send-email -H "Content-Type: application/json" -d '{
  "userEmail": "test@example.com",
  "webcamStatus": "Webcam working",
  "micStatus": "Microphone working"
}'
