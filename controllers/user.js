const User = require("../models/user")

module.exports.signinForm = (req,res) => {

    res.render("user/signup.ejs");

}

module.exports.signIn = async(req,res) => {
    try{
    
    
    
        let {username,email,password} = req.body;
        const user1 = new User({
            username,
            email
    
        });
        
    
      let userRegister =   await User.register(user1,password);
      req.login(userRegister,(err) => {
    
        if(err){
            return next(err);
        }
    
        req.flash("success","WelCome To WonderLust");
        res.redirect("/listing");
      })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
     }

     module.exports.loginForm = (req,res) =>{
        res.render("user/login.ejs");
     }

     module.exports.login = (req,res) => {

        req.flash("success","Welcome back to WonderLust!");
        let redirectUrl = res.locals.redirectUrl || "/listing"
        res.redirect(redirectUrl);
    
     }

    module.exports.logout= (req,res,next) =>{

        req.logout(err => {
            if(err){
                return next(err);
            }
            req.flash("success","You are logged out! ");
            res.redirect("/listing");
        })
     }