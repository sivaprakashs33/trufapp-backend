const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:[true,"name is require"]
    },
    email:{
        type:String,
        require:[true,"Email is require"],
        unique:true
    },
    password:{
        type:String,
        min:8
    },
    role: { 
        type: String,
        enum: ['user', 'admin'],
        required: true,
        default: 'user' 
    },
    phone:{
        type:String,
        required:true,
        
    },

},
{
    timeStamps:true,
}
);

module.exports = mongoose.model("User", userSchema);