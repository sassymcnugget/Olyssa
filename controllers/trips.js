const Trip = require("../models/trips");

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

// const show = (request, response) => {
// 	// render the show.ejs file in the response
// 	Trip.findById(request.params.id, (err, foundTrip) => {
// 		response.render("show.ejs", {
// 			trip: foundTrip,
// 		});
// 	});
// 	// NOTE: the render function will automatically look
// 	//       for files by the name we provide in the 'views folder
// };

module.exports = {
	index
	// new: newView,
	// create,
	// show,
};
