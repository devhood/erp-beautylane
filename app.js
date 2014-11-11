var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');

passport.use(new LocalStrategy(
  require('./routes/api').login
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(require('./routes/api').user);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'devhood', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', require('./routes/api'));
app.use('/users', require('./routes/users'));
app.use('/sales', require('./routes/sales'));
app.use('/customers', require('./routes/customers'));
app.use('/products', require('./routes/products'));
app.use('/purchases', require('./routes/purchases'));
app.use('/shipments', require('./routes/shipments'));
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true })
);
app.get('/login',function(req,res){
    console.log(req.session.messages);
    res.render('dashboard/login');
});
app.use('/', function(req, res) {
  res.render('dashboard/index');
});

var auth = function(req, res, next){
  if (!req.isAuthenticated())
    res.send(401);
  else next();
};


module.exports = app;
