var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require("express-ejs-layouts");
var mongoose = require('mongoose')
var Area = require("./models/area");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/areas', async (req, res) => {
  try {
    const areas = await Area.find();
    res.json(areas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/areas', async (req, res) => {
  try {
    let area = new Area(req.body)
    await area.save()
    res.status(201).json(area);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/areas/:id', async (req, res) => {
  try {
    const area = await Area.findById(req.params.id);
    if (area) {
      res.json(area);
    } else {
      res.status(404).json({ error: 'Area not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/areas/:id', async (req, res) => {
  let area = await Area.findById(req.params.id);
  area.name = req.body.name;
  area.locality = req.body.locality;
  area.attractions = req.body.attractions;
  await area.save()
  res.json(area);
});

app.delete('/areas/:id', async (req, res) => {
  try {

    let area = await Area.findByIdAndDelete(req.params.id);

    if (area) {
      res.json(area);
    } else {
      res.status(404).json({ error: 'Area not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error Noo' });
  }
});

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

mongoose.connect("mongodb://localhost/Exam", { useNewUrlParser: true }).then(() => console.log('Connected')).catch((error) => console.log(error.message))

module.exports = app;
