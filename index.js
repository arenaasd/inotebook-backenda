const express = require('express');
const app = express();
const connectToDB = require('./config/mongoose-connection'); // Make sure the path is correct
const auth = require('./routes/auth');
const notes = require('./routes/notes');
const cors = require('cors');

// Ensure DB connection is established before starting the app
connectToDB(); // Call the function here

app.use(express.json());
app.use(cors({
  origin: 'https://inotebook-bay-xi.vercel.app', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
}));
app.use('/api/auth', auth);
app.use('/api/notes', notes);

const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

// Optional export of the app (if you need to use it elsewhere)
module.exports = app;  // This export is optional and is only needed if you want to use app in tests or another module
