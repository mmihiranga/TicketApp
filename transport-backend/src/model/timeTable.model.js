const mongoose = require("mongoose");

const TimeTableSchema = new mongoose.Schema({
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true},
    destination: { type: String, required: true},
    routeId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'route'},
    busId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'bus'}
});

const TimeTable = mongoose.model('timeTable', TimeTableSchema);
module.exports = TimeTable;