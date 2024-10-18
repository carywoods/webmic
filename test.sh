curl -X POST https://webmic.onrender.com:10000/send-email \
-H "Content-Type: application/json" \
-d '{
  "userEmail": "carywoods@live.com",
  "webcamStatus": "Webcam working",
  "micStatus": "Microphone working"
}'
