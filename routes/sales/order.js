var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
  res.render('sales/order/list');
});
router.get('/add', function(req, res) {
  res.render('sales/order/add');
});
router.get('/edit', function(req, res) {
  res.render('sales/order/edit');
});
router.get('/view', function(req, res) {
  res.render('sales/order/view');
});

module.exports = router;
