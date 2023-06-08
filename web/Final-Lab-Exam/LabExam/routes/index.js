var express = require('express');
var router = express.Router();
var Area = require("../models/area");

/* GET home page. */
router.get('/', async function (req, res, next) {
  let area = await Area.find()
  console.log(area)
  res.render("index", { area })
});

router.get('/areas/addArea', async function (req, res, next) {
  res.render("areas/addArea")
});

router.post('/areas/addArea', async function (req, res, next) {
  let area = new Area(req.body)
  await area.save()
  res.redirect("/")
});

router.get('/delete/:id', async function (req, res, next) {
  let area = await Area.findByIdAndDelete(req.params.id);
  res.redirect("/")
});

router.get('/areas/editArea/:id', async function (req, res, next) {
  let area = await Area.findById(req.params.id);
  res.render("areas/editArea", { area })
});

router.post('/areas/editArea/:id', async function (req, res, next) {
  let area = await Area.findById(req.params.id);
  area.name = req.body.name;
  area.locality = req.body.locality;
  area.attractions = req.body.attractions;
  await area.save()
  res.redirect("/")
});

module.exports = router;
