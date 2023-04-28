const express = require('express');
const router = express.Router();
const orderController = require('./ordersController');

router.post('/orders', orderController.createOrder);
router.get('/orders/:id', orderController.getOrderById);
router.put('/orders/:id', orderController.updateOrderById);
router.delete('/orders/:id', orderController.deleteOrderById);

module.exports = router;
