var express = require('express');
var router = express.Router();

router.get('/order', function(req, res) {
	res.render('sales/order/index');
});
router.get('/order/add', function(req, res) {
	res.render('sales/order/add');
});

router.get('/delivery', function(req, res) {
	res.render('sales/delivery/index');
});
router.get('/delivery/approve', function(req, res) {
	res.render('sales/delivery/approve');
});

router.get('/invoice', function(req, res) {
	res.render('sales/invoice/index');
});
router.get('/invoice/approve', function(req, res) {
	res.render('sales/invoice/approve');
});

router.get('/order', function(req, res) {
	res.render('sales/reurn/index');
});
router.get('/return/add', function(req, res) {
	res.render('sales/return/add');
});
module.exports = router;
