var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var bf_gateway = require('./business_flow/BF_gateway');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json({limit: '1000000kb'}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',
	require('./routes/index'))
.use('/storekeeper', 
	require('./routes/storekeeper'))
.use('/customer', 
	require('./routes/customer'))
.use('/waiter', 
	require('./routes/waiter'))
.use('/manager', 
	require('./routes/manager'))
.use('/admin', 
	require('./routes/admin'))
.use('/images',
	require('./routes/images'))
.use('*', 
	require('./routes/else'));

  
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
