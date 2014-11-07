var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('products/index');
});
router.get('/list', function(req, res) {
	res.render('products/list');
});
router.get('/add', function(req, res) {
	res.render('products/add');
});
router.get('/edit', function(req, res) {
	res.render('products/edit');
});
router.get('/view', function(req, res) {
	res.render('products/view');
});

module.exports = router;