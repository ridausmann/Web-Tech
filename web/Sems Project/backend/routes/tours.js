var express = require('express');
var router = express.Router();

var Tour = require('../models/tour')

/* GET home page. */
router.get('/', async function (req, res, next) {
  let tours = await Tour.find();
  console.log(tours)
  res.render('tours/destination');
});

module.exports = router;
