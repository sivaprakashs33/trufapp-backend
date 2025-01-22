 const mongoose = require("mongoose");
 require('dotenv').config();
 const ConnectDB = async() => {
     try{

const connect =  await mongoose.connect(process.env.MONGODB_URL);
         console.log("connection to mongodb successfully")
     }catch(e){
         process.exit(1)
     }
 }
 module.exports = ConnectDB;


