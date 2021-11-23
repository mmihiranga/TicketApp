const mongoose = require("mongoose");

const InspectionsSchema = new mongoose.Schema({
    passengerCount: { type: Number, required: true },
    paidPCount: { type: Number, required: true},
    unpaidPCount: { type: Number, required: true},
    route: { type: String, required: false},
    busNo: { type: String, required: false},
    remarks: { type: String, required: false}
});

const Inspections = mongoose.model('inspections', InspectionsSchema);
module.exports = Inspections;