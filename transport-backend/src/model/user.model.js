const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({ 
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique:true},
    mobileNumber: { type: Number, required: true},
    password: {type:String, required:true},
    nic:{type:String},
    dob:{type:String},
    address:{type:String},
    city:{type:String},
    postalCode:{type:String},
    type:{type:String},
    cardDetails:{
        cardNo :{type: String},
        amount :{type:String},
        expiryDate:{type:String},
        cardType:{type:String},
        status:{type:String}
    
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;