var express = require('express');
var router = express.Router();

router.get('/order', function(req, res) {
	res.render('sales/order/index');
});
router.get('/order/add', function(req, res) {
	res.render('sales/order/add');
});
router.get('/order/list', function(req, res) {
	res.render('sales/order/add');
});
router.get('/order/approve', function(req, res) {
	res.render('sales/order/add');
});
router.get('/order/view', function(req, res) {
	res.render('sales/order/add');
});
router.get('/order/edit', function(req, res) {
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





router.get('/return', function(req, res) {
	res.render('sales/return/index');
});
router.get('/return/add', function(req, res) {
	res.render('sales/return/add');
});



router.get('/payment', function(req, res) {
	res.render('sales/payment/index');
});
router.get('/payment/add', function(req, res) {
	res.render('sales/payment/add');
});
router.get('/payment/approve', function(req, res) {
	res.render('sales/payment/approve');
});



router.get('/credit', function(req, res) {
	res.render('sales/credit/index');
});
router.get('/credit/approve', function(req, res) {
	res.render('sales/credit/approve');
});
module.exports = router;
