const mongoose = require('mongoose');

// Remove the newline character at the end of the URI
const uri = "mongodb+srv://akgamerz397:nadanak420@cluster0.rcjgs.mongodb.net/inotebook?retryWrites=true&w=majority&appName=Cluster0";

const connectToDB = async () => {
   try {
       const con = await mongoose.connect(uri);
       console.log("Connected to MongoDB");
   } catch (error) {
       console.log("Error connecting to MongoDB:", error);
   }
}

module.exports = connectToDB;
