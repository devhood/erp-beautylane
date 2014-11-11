var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
  res.render('sales/print/list');
});
router.get('/add', function(req, res) {
  res.render('sales/print/add');
});
router.get('/edit', function(req, res) {
  res.render('sales/print/edit');
});
router.get('/view', function(req, res) {
  res.render('sales/print/view');
});

module.exports = router;
