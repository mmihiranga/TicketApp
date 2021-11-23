const express = require('express');
const router = express.Router();
const CardController = require('../controller/card.controller');

module.exports = function (){
    router.get('/', CardController.getAllCard);
    router.post('/getAllCardByUserId', CardController.getAllCardByUserId);
    router.post('/create', CardController.createCard);
    router.post('/update', CardController.updateCard);
    router.post('/delete',CardController.deleteCard);
    return router;
}
