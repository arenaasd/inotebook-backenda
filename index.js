const express = require('express');
const app = express();
const db = require('./config/mongoose-connection')
const auth = require('./routes/auth')
const notes = require('./routes/notes')
const cors = require('cors')
db();

app.use(express.json());
app.use(cors())


app.use('/api/auth', auth)
app.use('/api/notes' , notes)


const port = 3000

app.listen(port, ()=>{
    console.log("app is on port 3000");
})