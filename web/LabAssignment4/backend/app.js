var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require("express-ejs-layouts");
var mongoose = require('mongoose')
var session = require('express-session')
var sessionAuth = require('./middlewares/sessionAuth');



var indexRouter = require('./routes/index');
var toursRouter = require('./routes/tours');
var userRouter = require('./routes/user');



var app = express();
app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 60000 }
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(sessionAuth);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

app.use('/', indexRouter);
app.use('/tours', toursRouter);
app.use('/', userRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect("mongodb+srv://ridausman7654:14DrxQLgb7I8qU9S@cluster0.zlxdcns.mongodb.net/Tour", { useNewUrlParser: true }).then(() => console.log('Connected')).catch((error) => console.log(error.message))

module.exports = app;
