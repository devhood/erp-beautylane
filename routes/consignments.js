var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('consignments/index');
});
router.get('/add', function(req, res) {
	res.render('consignments/add');
});
router.get('/edit', function(req, res) {
	res.render('consignments/edit');
});
router.get('/list', function(req, res) {
	res.render('consignments/list');
});
router.get('/view', function(req, res) {
	res.render('consignments/view');
});


module.exports = router;