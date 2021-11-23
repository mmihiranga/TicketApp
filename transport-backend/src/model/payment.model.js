const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    date: { type: Date, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user'},
});

const Payment = mongoose.model('payment', PaymentSchema);
module.exports = Payment;