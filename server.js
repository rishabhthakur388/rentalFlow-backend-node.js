const express = require('express');
const app = express();
const PORT = 3005;

// Middleware to log every request
app.use((req, res, next) => {
  console.log(`Ping received at ${new Date().toLocaleString()} from ${req.ip}`);
  next();
});

// Default route
app.get('/', (req, res) => {
  res.send('👋 Ping received!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
