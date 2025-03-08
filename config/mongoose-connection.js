const mongoose = require('mongoose');


const connectToDB = () =>{
    mongoose.connect('mongodb://localhost:27017/inotebook').then(() => {
        console.log('Connected to DB');
    }).catch((err) => {
        console.error('Error connecting to DB:', err);
    });
}

module.exports = connectToDB;