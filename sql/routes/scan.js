const express = require('express');
const scanController = require('../controllers/scan');

const router = express.Router();
router.post('/sendMessage', scanController.sendMessage)

module.exports = router;
