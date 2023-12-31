const express = require("express");
const router = express();
const wrapAsync = require("../util/wrapAsync.js");
const ExpressError = require("../util/ExpressError.js");
const listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListings} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const { storage} = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({storage});

// const listingSchema= require("../schema.js");
// const reviewSchema= require("../schema.js");
// const review = require("../models/reviews.js");



  

  // index Rout
  router.get("/trandings",isLoggedIn,listingController.tranding);

  router.get("/Rooms",isLoggedIn,listingController.tranding);

  router.get("/Iconic-cities",isLoggedIn,listingController.tranding);

  router.get("/Mountains",isLoggedIn,listingController.tranding);

  router.get("/Castles",isLoggedIn,listingController.tranding);

  router.get("/Amazing-Pools",isLoggedIn,listingController.tranding);

  router.get("/Camping",isLoggedIn,listingController.tranding);

  router.get("/Farms",isLoggedIn,listingController.tranding);

  router.get("/Arctic",isLoggedIn,listingController.tranding);

  router.get("/Domes",isLoggedIn,listingController.tranding);

  router.get("/Boats",isLoggedIn,listingController.tranding);
  
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),wrapAsync(listingController.newPost));

  //new rout

router.get("/new",isLoggedIn,listingController.new);
  
  //Creat post new
  
router.route("/:id")
.get(wrapAsync(listingController.showRoute))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),wrapAsync(listingController.updateRoute))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteRoute));

  // rout Edit

router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.routEdit));


  
  // rout put Update Edit
  

  
  //DELETE rout
  

  
  //show Rout
  

  module.exports = router;
  