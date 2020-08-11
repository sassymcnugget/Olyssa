const User = require("../models/users");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose"); 
const router = require("../routes/trips");

//read and encode data from the session 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));

// destroy the seesion when user click on link
const logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			console.log(err);
			res.redirect("/trips");
		} else {
			res.redirect("/trips");
		}
	});
};

//Path to '/users/signup/'
const newUser = (req, res) => {
	res.render("users/new.ejs", {
		currentUser: req.user
	})
};


//create User with Passport  
const createUser = (req, res) => {
	req.body.username
	req.body.email
	req.body.password
	User.register( new User({username: req.body.username, email: req.body.email}), req.body.password, function(err, user){
		if(err){
			console.log(err)
			return res.render("users/new.ejs",{
				currentUser: req.user

			})
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/trips")
		})
	}	
)};

module.exports = {
	logout,
	newUser,
	createUser
};
