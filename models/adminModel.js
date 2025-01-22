const mongoose = require("mongoose");
const trufSchema = mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
      require:true,
      ref:"User"
 },
        groundname: {
          type: String,
          required: true,
        },
        location: {
          type: String,
          required: true,
        },
        capacity: {
          type: Number,
          required: true,
        },
        availableDates: [{
          type: Date,
          required: true,
        }],
        image:{
          type: String,
          require: true,
        },
       
      },
      {
        timestamps: true,
      }
    );
    
   
    

module.exports = mongoose.model("Truf",trufSchema);