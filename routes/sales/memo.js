var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
  res.render('sales/memo/list');
});
router.get('/add', function(req, res) {
  res.render('sales/memo/add');
});
router.get('/edit', function(req, res) {
  res.render('sales/memo/edit');
});
router.get('/view', function(req, res) {
  res.render('sales/memo/view');
});

module.exports = router;
