const listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});

module.exports.index = async (req,res) => {

    const data = await listing.find({});
    res.render("index.ejs",{data});
  
  }

module.exports.new = (req,res) => {
    
  
    res.render("newForm.ejs");
  
  }

module.exports.newPost = async (req,res) => { 

  const response = await geocodingClient.forwardGeocode({
    query:req.body.listing.location,
    limit:1,
  }).send()

  
  if(!req.body.listing){
    throw new ExpressError(404,"enter data");
  }


  let url = req.file.path;
  let fileName = req.file.filename;
  let newData = new listing(req.body.listing);
      newData.owner = req.user._id;
      newData.image = {url,fileName};
      newData.geometry= response.body.features[0].geometry;

   let savedData =  await newData.save();
   console.log(savedData);
    req.flash("success","New listing Created");
    res.redirect("/listing");
  
  }

module.exports.routEdit = async (req,res)=> {
    let {id} = req.params;
    const data = await listing.findById(id)
    if(!data){
      req.flash("error","Listing you request does nor exist!")
      res.redirect("/listing");
    }
    let originalImg = data.image.url.replace("/upload","/upload/w_100");
    res.render("edit.ejs",{data,originalImg});

  }

module.exports.updateRoute = async (req,res) => {
  
    let {id} = req.params;
   let data = await listing.findByIdAndUpdate(id,{...req.body.listing});
   if(typeof req.file !== "undefined"){
  let url = req.file.path;
  let fileName = req.file.filename;
  data.image = {url,fileName};
  await data.save();          

   }
   req.flash("success","Listing Updated");

    res.redirect(`/listing/${id}`);
  
  }


module.exports.deleteRoute = async(req,res) => {
    
    let {id} = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success","Listing Deleted");

    res.redirect("/listing");
  }

  module.exports.showRoute = async (req,res) => {
    let { id } = req.params;
 const data = await listing.findById(id).populate(
   {
     path:"review",
     populate:{path:"author"},
})
 .populate("owner");
 
 if(!data){
   req.flash("error","Listing you request does nor exist!")
   res.redirect("/listing")
 }
 res.render("shows.ejs",{data});

}

module.exports.tranding = async (req,res) => {
  const data = await listing.find({});

  res.render("Tranding.ejs",{data});

}