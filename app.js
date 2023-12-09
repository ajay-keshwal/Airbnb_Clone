if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require('ejs-mate')
const MongoStore = require("connect-mongo");

const session = require("express-session");
const flash = require("connect-flash"); 
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");





app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({exdended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
const DBUrl =process.env.ATLASDB_url;

main().then(()=>{
    
  console.log("connection succesfully");
  
}).catch((err) => {
  console.log(err);
})
async function main(){
  
  await mongoose.connect(DBUrl);
  
}

const store = MongoStore.create({
  mongoUrl:DBUrl,
  crypto:{
    secret: process.env.SECRET,
  },
  touchAfter:24 * 3600,

})
store.on("error",() => {
  console.log("error in mongo session store",err);
})
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave:false,
  saveuUninitilized:true,
  cookie:{
    expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge:  7 * 24 * 60 * 60 * 1000,
    httpOnly:true,
  }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.listen(8080,(req,res) => {

    console.log("port is 8080");

});

app.use((req,res,next)=> {
  res.locals.success= req.flash("success");
  res.locals.error= req.flash("error");
  res.locals.currUser = req.user;
  next();
})




app.use("/listing",listingsRouter);
app.use("/listing/:id/reviews",reviewsRouter);
app.use("/",userRouter);


app.use((err,req,res,next) => {

  let  {statusCode=404,message="some Error"} = err;
  res.render("Error.ejs",{err});

});






