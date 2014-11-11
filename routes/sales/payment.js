var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
  res.render('sales/payment/list');
});
router.get('/approve', function(req, res) {
  res.render('sales/payment/approve');
});
router.get('/view', function(req, res) {
  res.render('sales/payment/view');
});

module.exports = router;
