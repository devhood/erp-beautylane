var express = require('express');
var router = express.Router();

router.get('/list', function(req, res) {
  res.render('sales/tripticket/list');
});
router.get('/add', function(req, res) {
  res.render('sales/tripticket/add');
});
router.get('/edit', function(req, res) {
  res.render('sales/tripticket/edit');
});
router.get('/view', function(req, res) {
  res.render('sales/tripticket/view');
});

module.exports = router;
