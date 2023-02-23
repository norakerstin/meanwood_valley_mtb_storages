var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var mongoose = require('mongoose');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var mtbRouter = require('./routes/mtb');
var mtbmodule = require ('./modules/mtbmodule.js');

var app = express();

var cors = require('cors');
app.use(cors());


//connectiong to the database:
mongoose.connect('mongodb+srv://nora:databasskolan@cluster0.dqi4rcv.mongodb.net/Meanwood_Valleys_MTB_Storages?retryWrites=true&w=majority');

//kollar så att kopplingen fungerar:
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Kopplingen lyckades!');
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/mtb', mtbRouter);

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
