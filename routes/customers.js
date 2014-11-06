var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('customers/index');
});
router.get('/add', function(req, res) {
	res.render('customers/add');
});
router.get('/edit', function(req, res) {
	res.render('customers/edit');
});
router.get('/list', function(req, res) {
	res.render('customers/list');
});
router.get('/view', function(req, res) {
	res.render('customers/view');
});


module.exports = router;