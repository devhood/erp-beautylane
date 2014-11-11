var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
  res.render('sales/payment/list');
});
router.get('/edit', function(req, res) {
  res.render('sales/payment/edit');
});
router.get('/view', function(req, res) {
  res.render('sales/payment/view');
});

module.exports = router;
