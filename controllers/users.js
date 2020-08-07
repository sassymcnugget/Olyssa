const User = require("../models/users");

const login = async (req, res) => {
	try {
		await User.findOne({ username: req.body.username }, (err, foundUser) => {
			if (!foundUser) {
				req.session.loggedIn = false;
                return res.redirect("/users/signup");
<<<<<<< HEAD
=======
                
>>>>>>> 82cbeacff3383e6768d9a962f5710e60ace4265a
			}
			if (
				foundUser.password.toString() === req.body.password.toString() &&
				foundUser.username.toString() === req.body.username.toString()
			) {
				req.session.loggedIn = true;
                return res.redirect("/trips");
                
			} else {
				req.session.loggedIn = false;
				return res.redirect("/trips");
			}
		});
	} catch (err) {
		res.redirect("/users/signup");
	}
};

//destroy the seesion when user click on link
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
		currentUser: req.session.loggedIn,
	});
};

//create and save user '/users/signup'
const createUser = async (req, res) => {
	try {
		const createUser = await User.create(req.body, (err, createdUser) => {
			res.redirect("/trips");
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	login,
	logout,
	newUser,
	createUser,
};
