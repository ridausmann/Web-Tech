var express = require('express');
var router = express.Router();
var Tour = require('../models/tour')
var checkSessionAuth = require('../middlewares/checkSessionAuth')
/* GET home page. */




const multer = require("multer");
const admin = require("firebase-admin");
const serviceAccount = require("../kchBhi.json");



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "tour-87741.appspot.com",
});

const bucket = admin.storage().bucket();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', async function (req, res, next) {
  let tour = await Tour.find();
  console.log(tour)
  res.render('index', { tour })
});

router.get('/', async function (req, res, next) {
  let tour = await Tour.find();
  console.log(tour)
  res.render('index', { tour })
});


router.get('/add', checkSessionAuth, async function (req, res, next) {
  res.render('tours/add');
});

// router.post('/add', async function (req, res, next) {
//   let tour = new Tour(req.body);
//   await tour.save();
//   res.redirect('/');
// });

router.post("/add", upload.single("image"), async (req, res) => {
  const { destination, price, time, remarks } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  const filename = Date.now() + "_" + file.originalname;
  const filepath = `Tour/${filename}`;

  const bucketFile = bucket.file(filepath);

  const stream = bucketFile.createWriteStream({
    resumable: false,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: Date.now(),
      },
    },
  });

  stream.on("finish", async () => {
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name
      }/o/${encodeURIComponent(filepath)}?alt=media&token=${bucketFile.metadata.metadata.firebaseStorageDownloadTokens
      }`;

    const tour = new Tour({
      destination: destination,
      price: price,
      time: time,
      remarks: remarks,
      image: imageUrl,
    });

    try {
      const savedTour = await tour.save();
      res.redirect("/"); // or any other desired route
    } catch (error) {
      console.error("Error saving destination:", error);
      res.status(500).send("Error saving destination");
    }
  });

  stream.end(file.buffer);
});

router.get('/delete/:id', checkSessionAuth, async function (req, res, next) {
  let tour = await Tour.findByIdAndDelete(req.params.id);
  res.redirect("/")
});

router.get('/edit/:id', checkSessionAuth, async function (req, res, next) {
  let tour = await Tour.findById(req.params.id);
  res.render("tours/edit", { tour })
});

router.post('/edit/:id', async function (req, res, next) {
  let tour = await Tour.findById(req.params.id);
  tour.destination = req.body.destination;
  tour.price = req.body.price;
  tour.time = req.body.time;

  await tour.save()
  res.redirect("/")
});

router.get('/wishlist', function (req, res, next) {
  let wishlist = req.cookies.wishlist;
  if (!wishlist) wishlist = []
  res.render("wishlist", { wishlist })
});

router.get('/wishlist/:id', async function (req, res, next) {
  let tour = await Tour.findById(req.params.id);
  let wishlist = []
  if (req.cookies.wishlist) wishlist = req.cookies.wishlist
  wishlist.push(tour)
  res.cookie("wishlist", wishlist)
  console.log("Add this tour in wishlist")
  res.redirect("/wishlist")
});

router.get('/wishlist/remove/:id', async function (req, res, next) {
  let wishlist = []
  if (req.cookies.wishlist) wishlist = req.cookies.wishlist
  wishlist.splice(wishlist.findIndex((c) => (c._id == req.params.id)), 1)
  res.cookie("wishlist", wishlist)
  console.log("Add this tour in wishlist")
  res.redirect("/wishlist")
});

module.exports = router;
