var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
  res.render('sales/delivery/list');
});
router.get('/approve', function(req, res) {
  res.render('sales/delivery/approve');
});
router.get('/view', function(req, res) {
  res.render('sales/delivery/view');
});

module.exports = router;
