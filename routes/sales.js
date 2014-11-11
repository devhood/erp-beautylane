var express = require('express');
var router = express.Router();

router.use('/order', require('./sales/order'));
router.use('/delivery', require('./sales/delivery'));
router.use('/invoice', require('./sales/invoice'));
//router.use('/return', require('./sales/return'));
//router.use('/memo', require('./sales/memo'));
//router.use('/payment', require('./sales/payment'));

module.exports = router;
