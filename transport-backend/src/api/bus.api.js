const express = require('express');
const router = express.Router();
const BusController = require('../controller/bus.controller');

module.exports = function (){
    router.get('/', BusController.getAllBus);
    router.post('/create', BusController.createBus);
    router.post('/update', BusController.updateBus);
    router.post('/delete',BusController.deleteBus);
    router.post('/find',BusController.getBusByBusNumber);
    router.get('/getBusCountByRoute',BusController.getAllBusGroupByRoute);
    return router;
}
