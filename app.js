var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/api'));
app.use('/users', require('./routes/users'));
app.use('/sales', require('./routes/sales'));
app.use('/customers', require('./routes/customers'));
app.use('/product', require('./routes/product'));
app.use('/purchase', require('./routes/purchase'));
app.use('/shipment', require('./routes/shipment'));

module.exports = app;
