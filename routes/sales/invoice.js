var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
  res.render('sales/invoice/list');
});
router.get('/add', function(req, res) {
  res.render('sales/invoice/add');
});
router.get('/edit', function(req, res) {
  res.render('sales/invoice/edit');
});
router.get('/view', function(req, res) {
  res.render('sales/invoice/view');
});

module.exports = router;
