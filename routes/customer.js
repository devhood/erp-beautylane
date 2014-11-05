var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('customer/index');
});
router.get('/add', function(req, res) {
	res.render('customer/add');
});

module.exports = router;