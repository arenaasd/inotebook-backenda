const mongoose = require('mongoose');


const connectToDB = () =>{
  try {
       const con =  await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        
    }
}

module.exports = connectToDB;
