
// express is the web programming framework that makes
// writing a web app extremely easy
// not included in node.js installation by default
// it's a 3rd party package
var express = require('express');

// path is a utility that aids in server-side file paths
var path = require('path');

// favicon helps serve the webpages favicon
var favicon = require('serve-favicon');

// morgan is a logging package
var logger = require('morgan');

// cookie-parser parses the web browsers cookies
var cookieParser = require('cookie-parser');

// body-parser parses the "body" of web requests and
// exposes that data in "req.body" of express functions
// like app.get('/home', function(req, res) {})
var bodyParser = require('body-parser');

// notice the "./" inside the require function
// that is a relative path to a local file
// when "require" grabs this local file, the resulting
// return value will be equal to whatever "module.exports"
// was set to inside "index.js"
var routes = require('./routes/index');
// the rest of these are local files all acting like the
// `C` in MVC
var users = require('./routes/users');
var beMagic = require('./routes/be-the-magic');
var seeMagic = require('./routes/see-the-magic');

// app is the heart of the express application
// when I first learned about express, I wondered if the
// name "epress" meant that its purpose was to only get
// you up and running quickly, to expedite your web app
// almost like "Hz Light" would imply this is the
// "dumbed-down" version of our service that is missing
// many of the core features. I quickly learned that this
// is not the case. Express is a feature rich framework
// that is enterprise ready.
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// this section ties up the web routes
app.use('/', routes);
// the name for this style is middleware
app.use('/users', users);
// if you haven't guessed it already, the first argument
// is the route, and the second argument is effectively
// the "Route-Controller"
app.use('/be-the-magic', beMagic);
app.use('/see-the-magic', seeMagic);

// catch 404 and forward to error handler
// order matters with "app.use"
// if this was written before the other app.use calls,
// every web request (even to valid routes) would result
// in a 404 error
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
