const asyncHandler = require("express-async-handler");
const Truf = require('../models/adminModel');


 const createGround = asyncHandler(async (req, res) =>{
     console.log(req.user);
     if(!req.body.groundname){
         res.status(400);
         throw new Error("please all field");
     }

     const { groundname, location, capacity,availableDates,image, role } = req.body;
     const ground = await Truf.create({
         groundname,
         location,
         capacity,
         availableDates,
         image,
         role,
         user:req.user.id,
     });
     return res.status(201).send(ground);
 });

 const getGround = asyncHandler((async(req, res) =>{
     const grounds = await Truf.find({ user: req.user.id});        // user: req.user.id
     res.status(200).send(grounds);
 }));

 const updateGround = asyncHandler(async(req, res) =>{
      const ground = await Truf.findById(req.params.id)
      if(!ground){
         res.status(400);
         throw new Error(" Ground not found")

      }
      if (!req.user) {
         res.status(400);
         throw new Error("User not found");
      }
      if (ground.user.toString() !== req.user.id) {
         res.status(401);
         throw new Error("user not authorized");
      }
      const updateground = await Truf.findByIdAndUpdate(req.params.id, req.body,{
         new:true,
     });
     res.status(200).send(updateground);
     
 });

 const deleteGround = asyncHandler(async(req, res)=>{
     const Ground = await Truf.findById(req.params.id);
     if(!Ground){
         res.status(400);
         throw new Error("Ground not found");

     }
 
 if (!req.user) {
     res.status(400);
     throw new Error("user not found");
 }
 if (ground.user.toString() !== req.user.id) {
     res.status(401);
     throw new Error("user not authorized");
 }

     const deleteGround = await Truf.deleteOne({_id:req.params.id});
     res.status(200).send({id:req.params.id});

 });

 module.exports = {createGround, getGround, updateGround, deleteGround }
