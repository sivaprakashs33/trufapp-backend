 const mongoose = require("mongoose");
 const groundSchema = mongoose.Schema({
   
      date:{
        type: Date,
        require:true,
      },
      startetime: { type: String,
          required: true
          },
     endtime: { type: String, 
          required: true
          },
         
             paymentStatus: {
               type: String,
               enum: ['pending', 'paid'],
               default: 'pending',
             },
             totalAmount: {
              type:Number,
              require: true
             },
             user:{
              type:mongoose.Schema.Types.ObjectId,
              require:true,
              ref:"User",
          },
          truf:{
            type:mongoose.Schema.Types.ObjectId,
            require:true,
            ref:"Truf"
          },
            
     

 }, 
 { timestamps: true });
 module.exports = mongoose.model("Ground", groundSchema);
