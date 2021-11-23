const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    cardNumber: { type: String, required: true, unique:true },
    expireDate: { type: Date, required: true },
    type: { type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user'}
});

const Card = mongoose.model('card', CardSchema);
module.exports = Card;