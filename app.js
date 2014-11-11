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
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

var app = express();
var auth = function(req, res, next){
  if (!req.isAuthenticated())
    res.redirect("/login");
  else next();
};

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


app.use('/api',auth, require('./routes/api'));
app.use('/users',auth, require('./routes/users'));
app.use('/sales',auth, require('./routes/sales'));
app.use('/customers',auth, require('./routes/customers'));
app.use('/products',auth, require('./routes/products'));
app.use('/purchases',auth, require('./routes/purchases'));
app.use('/shipments',auth, require('./routes/shipments'));
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true })
);
app.get('/login',function(req,res){
    res.render('dashboard/login',{message : req.flash('error')[0]});
});
app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});
app.post('/logout', function(req, res){
    req.session.destroy();
      setTimeout(function() {
          res.redirect("/login");
      }, 2000);
});
app.use('/',auth, function(req, res) {
  res.render('dashboard/index');
});


module.exports = app;
