const express = require('express');
const app = express();
const connectToDB = require('./config/mongoose-connection'); // Make sure the path is correct
const auth = require('./routes/auth');
const notes = require('./routes/notes');
const cors = require('cors');

// Ensure DB connection is established before starting the app
connectToDB(); // Call the function here

app.use(express.json());
app.use(cors());

app.use('/api/auth', auth);
app.use('/api/notes', notes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
