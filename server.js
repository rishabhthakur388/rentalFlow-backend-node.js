const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const dbconnect = require('./config/config');
const morgan = require('morgan');
const PORT = 3005;
dbconnect();

//routes
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use('/data', require('./routes/userdatasRoutes'));
app.use('/data', require('./routes/addCategoriesRoutes'));
// app.use('/', require('./routes/stripeRoute'));

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
  console.log(`🚀 Server is running on ${PORT}`);
});
