var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('purchases/index');
});
router.get('/list', function(req, res) {
	res.render('purchases/list');
});
router.get('/add', function(req, res) {
	res.render('purchases/add');
});
router.get('/approve', function(req, res) {
	res.render('purchases/approve');
});
router.get('/edit', function(req, res) {
	res.render('purchases/edit');
});
router.get('/view', function(req, res) {
	res.render('purchases/view');
});

module.exports = router;