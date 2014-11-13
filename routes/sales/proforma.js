var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
  res.render('sales/proforma/list');
});
router.get('/add', function(req, res) {
  res.render('sales/proforma/add');
});
router.get('/edit', function(req, res) {
  res.render('sales/proforma/edit');
});
router.get('/view', function(req, res) {
  res.render('sales/proforma/view');
});

module.exports = router;
