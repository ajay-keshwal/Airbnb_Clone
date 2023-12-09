const express = require("express");
const router = express();
const User = require("../models/user.js");
const wrapAsync = require("../util/wrapAsync.js");
const passport = require("passport");
const {saveRedirect} = require("../middleware.js");
const userController = require("../controllers/user.js");

router.route("/signup")
.get(userController.signinForm)
.post(wrapAsync(userController.signIn));

 router.route("/login")
 .get(userController.loginForm)
.post(saveRedirect,passport.authenticate("local", { failureRedirect: '/login' , failureFlash:true }),userController.login);

 router.get("/logout",userController.logout);

module.exports = router;