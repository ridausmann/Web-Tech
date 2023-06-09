var express = require('express');
var router = express.Router();

var Tour = require('../models/tour')

/* GET home page. */
router.get('/', async function (req, res, next) {
  let tour = await Tour.find();
  console.log(tour)
  res.render('tours/destination', { title: "List tours", tour });
});

// router.get('/add', async function (req, res, next) {
//   res.render('tours/add');
// });

// router.post('/add', async function (req, res, next) {
//   let tour = new Tour(req.body);
//   await tour.save();
//   res.redirect('/layout');
// });



module.exports = router;
