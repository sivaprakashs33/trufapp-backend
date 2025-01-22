 const User = require('../models/userModel');

 const asyncHandler = require("express-async-handler");
 const bcrypt = require("bcryptjs");
 const jwt = require('jsonwebtoken');
 require("dotenv").config();

 const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password, role, phone } = req.body;

    if(!name || !email || !password || !role || !phone){
     res.status(400);
     throw new Error("please fill all the fields")
    }

    const userExists = await User.findOne({email:email});
    if(userExists){
     res.status(400);
     throw new Error ("user alredt exists")
    }
   
    const secret = parseInt(process.env.SALT);
    const salt = await bcrypt.genSalt(secret);
   
    const hashedapassword = await bcrypt.hash(password,salt);
 
  
    const user = await User.create({
     name:name,
     email:email,
     password:hashedapassword,
     role:role,
     phone:phone,
    
    })
    console.log(user)
  
    if(user){
     res.status(201).json({
         _id:user.id,
         name:user.name,
         email:user.email,
         role:user.role,
         phone:user.phone,
       

     })
    }else{
     res.status(400);
     throw new Error("invalid user data");
    }

 });


 const loginUser = asyncHandler(async (req,res) =>{

     const{email,password} = req.body;
     const user = await User.findOne({email})
     console.log(user);
     if(user && (await bcrypt.compare(password,user.password))){
         res.status(200).json({
             _id:user._id,
             name:user.name,
             email:user.email,
             token:generateToken(user._id),

         })
         }else{
             res.status(400);
             throw new Error("tnvalide username or password");
     }
 });

 const generateToken = (id) =>{
    var token = jwt.sign({ id },process.env.LOGIN_SECRET_KEY,
     {expiresIn:'30d'});
  
     console.log(token);
    return token;
 };



//   const updetedUser = asyncHandler(async (req,res) =>{
//       const { userId } = req.params;
//       const { name, email, password } = req.body;

//       try{
//           const updetedUser = await User.findByIdAndUpdate(userId,{name, email, password, });
    
//       }catch{

//       }
//   });

 module.exports = { registerUser,loginUser };