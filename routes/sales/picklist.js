var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
  res.render('sales/picklist/list');
});
router.get('/add', function(req, res) {
  res.render('sales/picklist/add');
});
router.get('/edit', function(req, res) {
  res.render('sales/picklist/edit');
});
router.get('/view', function(req, res) {
  res.render('sales/picklist/view');
});

module.exports = router;
