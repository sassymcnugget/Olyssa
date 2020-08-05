const Trip = require("../models/trips")
const Sightseeing = require("../models/sightseeings")


//Path to '/trips/new/'
const newOne = (req, res) => {
	res.render("trips/new.ejs")
}

//create and save trip at '/trips/new/'
const createTrip = async (req, res) => {
	try{
		 const createdTrip = await Trip.create(req.body, (err, createdTrip) => {
			res.redirect("/trips")
		})
	} catch (err) {
		console.log(err)
	}} 

//Path to /trips - Homepage 
const index = async (req, res) => {
	Trip.find({}, (err, allTrips) => {
		console.log(req.session)
		res.render("home.ejs", {
			trips: allTrips,
			
		})
	})
}

//Path to the Show page 
const show = (req, res) => {
	
	Trip.findById(req.params.id)
		.populate('sightseeing')
        .exec((err, foundTrip ) => {
            if(err) {
                res.send(err)
            } else {
				console.log(foundTrip.sightseeing)
                res.render('trips/show.ejs', {
                    trip: foundTrip, 
					sightseeing: foundTrip.sightseeing,
					longtitude: foundTrip.lng,  // longtitude, lattitude variables are being passed to app.js as hidden variables in show.ejs 
					lattitude: foundTrip.lat
				})
			}
		})
	}

// Delete Trip on show page 
const removeTrip = async(req, res) => {
	try{
		const deleteTrip = await Trip.findByIdAndDelete(req.params.id, (err, deleteTrip) =>{
			res.redirect('/trips')
		})
	}
	catch (err){
		console.log(err)
	}
}

module.exports = {
	index, 
	show,
	newOne,
	createTrip,
	removeTrip
}
