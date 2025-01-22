 const asyncHandler = require("express-async-handler");
 const Ground= require("../models/bookingModel");
 const Truf = require("../models/adminModel");
 const User = require("../models/userModel");
 
 

 const getAllGround = asyncHandler(async(req, res) =>{
     const ground = await Ground.find({});
     res.status(200).send(ground);
 });


 const bookingGround = asyncHandler(async (req, res) => {
     
     if(!req.Truf.id) {
        res.status(400);
        throw new Error("truf id not invalide");   
    }

     if(!req.body.date) {
        res.status(400);
        throw new Error("please full  all field ");
     }
        
    const { date, startetime, endtime, totalAmount } = req.body;  
       console.log(req.user);
    

    const paymentStatus = simulatePayment(totalAmount);

    let bookingStatus = 'pending';
    if (paymentStatus === 'paid') {
        bookingStatus = 'confirmed';
    } else if (paymentStatus === 'failed') {
        bookingStatus = 'cancelled';
    }
    
   
        const newBooking = await Ground.create({
            date,
            startetime,
            endtime,
            totalAmount, 
            user:req.user.id,
            
           
            
            
        });

       
        res.status(201).send({
            booking: newBooking,
            message: `Booking successfully ${paymentStatus}`,  
            date: new Date(),
            status: bookingStatus
        });
    
});

 const getBooking = asyncHandler(async(req,res) =>{
   
         const { user_id, truf_id } = req.query;
    
         if (!user_id || !truf_id) {
             return res.status(400).json({ error: 'User ID and Ground ID are required.' });
         }
    
        
         const booking = bookings.find(b => b.user_id == user_id && b.ground_id == ground_id);
    
         if (booking) {
             res.json(booking);
         } else {
             res.status(404).json(null);
         }
     });





const bookingcancel = asyncHandler(async(req,res) =>{
    const booking = await Ground.findById(req.params.id)
    if(!req.truf){
        res.status(400);
        throw new Error("booking not found");
    }
    if(!req.user){
        res.status(400);
        throw new Error("user not found");
        
    }
    if(!truf.user.toString() !==req.user.id) {
        res.status(401);
        throw new Error("user not authorized");
        
    }
    const bookingcancel = await Ground.deleteOne({_id:req.params.id});
    res.status(200).send(req.params.id)

});



function simulatePayment(amound) {
   
    const successRate = Math.random();
    if (successRate <= 0.8) {
        return 'paid'; 
    } else {
        return 'failed';
    }
}



 module.exports = { getAllGround, getBooking, bookingGround, bookingcancel}