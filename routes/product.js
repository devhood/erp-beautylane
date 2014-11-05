var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('product/index');
});
router.get('/add', function(req, res) {
	res.render('product/add');
});

module.exports = router;