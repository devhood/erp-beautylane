var express = require('express');
var router = express.Router();

router.get('/order', function(req, res) {
	res.render('sales/order/index');
});
router.get('/order/add', function(req, res) {
	res.render('sales/order/add');
});
router.get('/order/list', function(req, res) {
	res.render('sales/order/list');
});
router.get('/order/approve', function(req, res) {
	res.render('sales/order/approve');
});
router.get('/order/view', function(req, res) {
	res.render('sales/order/view');
});
router.get('/order/edit', function(req, res) {
	res.render('sales/order/edit');
});




router.get('/delivery', function(req, res) {
	res.render('sales/delivery/index');
});
router.get('/delivery/approve', function(req, res) {
	res.render('sales/delivery/approve');
});
router.get('/delivery/list', function(req, res) {
	res.render('sales/delivery/list');
});





router.get('/invoice', function(req, res) {
	res.render('sales/invoice/index');
});
router.get('/invoice/approve', function(req, res) {
	res.render('sales/invoice/approve');
});
router.get('/invoice/list', function(req, res) {
	res.render('sales/invoice/list');
});





router.get('/return', function(req, res) {
	res.render('sales/return/index');
});
router.get('/return/approve', function(req, res) {
	res.render('sales/return/approve');
});
router.get('/return/list', function(req, res) {
	res.render('sales/return/list');
});


router.get('/memo', function(req, res) {
	res.render('sales/memo/index');
});
router.get('/memo/approve', function(req, res) {
	res.render('sales/memo/approve');
});
router.get('/memo/list', function(req, res) {
	res.render('sales/memo/list');
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
router.get('/payment/list', function(req, res) {
	res.render('sales/payment/list');
});



module.exports = router;
