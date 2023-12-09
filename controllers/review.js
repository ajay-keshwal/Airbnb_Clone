const review = require("../models/reviews.js");
const listing = require("../models/listing.js");

module.exports.postReview = async(req,res) => {

    let listings = await listing.findById(req.params.id);
    const newReview = new review(req.body.reviews);
  
   listings.review = listings.review || [];
   newReview.author = req.user._id;
  
   listings.review.push(newReview);
  
   let neww  =await newReview.save();
   await listings.save();
   req.flash("success","New Review Created");
  
   
  
   res.redirect(`/listing/${req.params.id}`)
  
  }

  module.exports.destroyReview = async (req,res)=>{

    let {id,reviewId} = req.params;
    await listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    await review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
  
    res.redirect(`/listing/${id}`);
  
  }