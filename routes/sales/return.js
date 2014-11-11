var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
  res.render('sales/return/list');
});
router.get('/add', function(req, res) {
  res.render('sales/return/add');
});
router.get('/edit', function(req, res) {
  res.render('sales/return/edit');
});
router.get('/view', function(req, res) {
  res.render('sales/return/view');
});

module.exports = router;
