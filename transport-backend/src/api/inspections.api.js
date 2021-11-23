const express = require('express');
const router = express.Router();
const InspectionsController = require('../controller/inspections.controller');

module.exports = function (){
    router.get('/', InspectionsController.getAllInspections);
    router.post('/create', InspectionsController.createInspections);
    return router;
}
