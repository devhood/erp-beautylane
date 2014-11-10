var express = require('express');
var router = express.Router();

router.use('/order', require('./sales/order'));
//router.use('/delivery', require('./routes/sales/delivery'));
//router.use('/invoice', require('./routes/sales/invoice'));
//router.use('/return', require('./routes/sales/return'));
//router.use('/memo', require('./routes/sales/memo'));
//router.use('/payment', require('./routes/sales/payment'));

module.exports = router;
