var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('adjustments/index');
});
router.get('/add', function(req, res) {
	res.render('adjustments/add');
});
router.get('/edit', function(req, res) {
	res.render('adjustments/edit');
});
router.get('/list', function(req, res) {
	res.render('adjustments/list');
});
router.get('/view', function(req, res) {
	res.render('adjustments/view');
});


module.exports = router;
