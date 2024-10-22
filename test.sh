curl -X POST https://webmic.onrender.com/send-email \
-H "Content-Type: application/json" \
-d '{
  "userEmail": "carywoods@live.com",
  "webcamStatus": "Webcam working",
  "micStatus": "Microphone working"
}'
