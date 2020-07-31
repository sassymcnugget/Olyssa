const Trip = require("../models/trips");
const { response } = require("express");

// const newView = (request, response) => {
// 	response.render("new.ejs");
// };

// const create = (request, response) => {
// 	// request.body is an object that holds data sent from the form
// 	// if (request.body.readyToEat === 'on') {
// 	//     request.body.readyToEat = true
// 	// } else {
// 	//     request.body.readyToEat = false
// 	// }

// 	Trip.create(request.body, (err, createdTrip) => {
// 		response.redirect("/trips");
// 	});
// };

const index = (req, res) => {
	res.render('home.ejs')
	// Trip.find({}, (err, allTrips) => {
		
	// 	res.render("home.ejs", {
	// 		trips: allTrips,
	// 	});
	// });
};

const show = (req, res) => {
	res.render("trips/show.ejs")
	// render the show.ejs file in the response
	// Trip.findById(req.params.id, (err, foundTrip) => {
	// 	res.render("show.ejs", {
	// 		trip: foundTrip,
	// 	});
}

module.exports = {
	index, 
	show
	// new: newView,
	// create,

};
