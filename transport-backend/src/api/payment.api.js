const express = require('express');
const router = express.Router();
const PaymentController = require('../controller/payment.controller');

module.exports = function (){
    router.get('/', PaymentController.getAllPayment);
    router.post('/getPaymentByID', PaymentController.getAllPaymentByUserId);
    router.get('/getPaymentByDate', PaymentController.getAllPaymentGroupByDate);
    router.post('/create', PaymentController.createPayment);
    router.post('/update', PaymentController.updatePayment);
    router.post('/delete',PaymentController.deletePayment);
    return router;
}
