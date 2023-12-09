const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../util/wrapAsync.js");
const ExpressError = require("../util/ExpressError.js");
const review = require("../models/reviews.js");
const listing = require("../models/listing.js");
const reviewController = require("../controllers/review.js")

const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");




//Review
//post review
router.post("/",isLoggedIn, wrapAsync(reviewController.postReview));

//Delete post Review

router.delete("/:reviewId",isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;
