var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
  res.render('sales/delivery/list');
});
router.get('/add', function(req, res) {
  res.render('sales/delivery/add');
});
router.get('/edit', function(req, res) {
  res.render('sales/delivery/edit');
});
router.get('/view', function(req, res) {
  res.render('sales/delivery/view');
});

module.exports = router;
