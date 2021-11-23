const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
    busName: { type: String, required: true },
    busNumber: { type: String, required: true, unique:true},
    noOfSeats: { type: Number, required: true},
    Image: { type: String, required: false},
    routeId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'route'}
});

const Bus = mongoose.model('bus', BusSchema);
module.exports = Bus;