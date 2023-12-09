const mongoose = require("mongoose");
const review = require("./reviews.js");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,

        
    },
    description:{
        type:String

    },
    image:{
        url:String,
        fileName:String
    },
    price:Number,
    location:String,
    country:String,
    review:[
        {
        
        type:Schema.Types.ObjectId,
        ref:"reviews",

    },
],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry:{
    type: {
        type: String, 
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    
});

listingSchema.post("findOneAndDelete",async(listing)=>{
if(listing){


    await review.deleteMany({_id:{$in: listing.review}});
}
});

const listing = mongoose.model("listing",listingSchema);
module.exports = listing;