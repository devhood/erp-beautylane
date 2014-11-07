var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('shipments/index');
});
router.get('/list', function(req, res) {
	res.render('shipments/list');
});
router.get('/add', function(req, res) {
	res.render('shipments/add');
});
router.get('/approve', function(req, res) {
	res.render('shipments/approve');
});
router.get('/edit', function(req, res) {
	res.render('shipments/edit');
});
router.get('/view', function(req, res) {
	res.render('shipments/view');
});

module.exports = router;