var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('users/index');
});
router.get('/list', function(req, res) {
	res.render('users/list');
});
router.get('/add', function(req, res) {
	res.render('users/add');
});
router.get('/edit', function(req, res) {
	res.render('users/edit');
});
router.get('/view', function(req, res) {
	res.render('users/view');
});

module.exports = router;
