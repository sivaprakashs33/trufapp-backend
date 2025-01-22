 const exprees = require("express");


 const { getAllGround, bookingGround, getBooking, bookingcancel } = require("../controller/bookingController");
//  const { get } = require("mongoose");
 const { protect } = require("../middlewares/auth");

 const router = exprees.Router();

 router.get("/getall" ,protect, getAllGround);
 router.post("/newbooking",protect,bookingGround);
 router.post("/getbooking/:id ",protect,getBooking);
 router.delete("/cancelbook/:id",protect,bookingcancel );
 



 module.exports = router;