const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({ 
    userID: { type: String, required: true },
    startTerminal: { type: String, required: true },
    endTerminal: { type: String},
    busNo: { type: String, required: true },
    route: { type: String, required: true },
    timeOut:{type:String},
    timeIn:{type:String ,required: true},
    noOfTerminal:{type: Number},
    totalFair:{type:Number},
    date:{type:String},
  
});

const Trip = mongoose.model('trip', TripSchema);
module.exports = Trip;