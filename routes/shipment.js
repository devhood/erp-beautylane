var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('shipment/index');
});
router.get('/add', function(req, res) {
	res.render('shipment/add');
});

module.exports = router;