const express = require('express');
const socket = require('socket.io');
const router = express.Router();
const chatController = require('./chatController');

router.get('/user/:id', chatController.getUserChat);
router.get('/retailer/:id', chatController.getRetailerChat);
router.post('/create-chat', chatController.createChat);
router.get('/', chatController.test);

module.exports = router;
