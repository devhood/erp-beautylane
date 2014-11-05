var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('users/index');
});
router.get('/add', function(req, res) {
	res.render('users/add');
});

module.exports = router;
