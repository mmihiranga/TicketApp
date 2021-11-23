const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema({
    routeName: { type: String, required: true, unique:true  },
    from: { type: String, required: true },
    to: { type: String, required: true },
    farePerTerminal: { type: Number, required: true },
    noOfTerminals: { type: Number, required: true}
});

const Route = mongoose.model('route', RouteSchema);
module.exports = Route;