const mongoose = require('mongoose');

const uri = "mongodb+srv://akgamerz397:nadanak420@cluster0.rcjgs.mongodb.net/inotebook"
const connectToDB = async () =>{
   try {
       const con =  await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        
    }
}

module.exports = connectToDB;
