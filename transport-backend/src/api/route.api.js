const express = require('express');
const router = express.Router();
const RouteController = require('../controller/route.controller');

module.exports = function (){
    router.get('/', RouteController.getAllRoute);
    router.post('/create', RouteController.createRoute);
    router.post('/update', RouteController.updateRoute);
    router.post('/delete',RouteController.deleteRoute);
    router.post('/find',RouteController.getRouteByRouteName);
    return router;
}
