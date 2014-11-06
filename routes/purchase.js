var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('purchase/index');
});
router.get('/add', function(req, res) {
	res.render('purchase/add');
});

module.exports = router;