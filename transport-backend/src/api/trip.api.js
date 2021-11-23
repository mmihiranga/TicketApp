const express = require('express');
const router = express.Router();
const TripController = require('../controller/trip.controller');

module.exports = function (){
    router.get('/', TripController.getAllTrip);
    router.post('/create', TripController.createTrip);
    router.put('/update', TripController.updateTrip);
    router.delete('/delete',TripController.deleteTrip);
    router.get('/:id',TripController.getTripById);
    return router;
}
