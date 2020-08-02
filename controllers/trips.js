const Trip = require("../models/trips")
const Sightseeing = require("../models/sightseeings")


//Path to '/trips/new/'
const newOne = (req, res) => {
	res.render("trips/new.ejs")
}

//create and save trip at '/trips/new/'
const createTrip = async (req, res) => {
	try{
		console.log(req.body) 
		//create new var for whole object and see how you get it 
		// object.location = req.body.latitude 
		 const createdTrip = await Trip.create(req.body, (err, createdTrip) => {
			console.log(createdTrip)
			console.log(req.body)
			res.redirect("/trips")
		})
	} catch (err) {
		console.log(err)
	}} 

//Path to /trips - Homepage 
const index = async (req, res) => {
	Trip.find({}, (err, allTrips) => {
		res.render("home.ejs", {
			trips: allTrips,
		});
	});
};

//Path to individual trip show page('/trip/id') - retrieves data from Trips, Sightseeing models 
//to show sights for each trip
const show = async (req, res) => {
	Trip.findById(req.params.id)
		.populate('sightseeing')
        .exec((err, foundTrip ) => {
            if(err) {
                res.send(err)
            } else {
                res.render('trips/show.ejs', {
                    trip: foundTrip, 
                    sightseeing: foundTrip.sightseeing
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

///Create a new sightseeing on Trips show page ('/trip/id')
const createTripsSight = async(req, res) => {
	try{
		const createdSight = await Sightseeing.create(req.body) 
		Trip.findOneAndUpdate(req.params.id, {new: true}, {$set:{sightseeing: createdSight}}, (err, updatedTrip) =>{
			updatedTrip.sightseeing.push(createdSight)
			updatedTrip.save((err, result) => {
				res.redirect(`/trips/${ req.params.id }`)
			})
		}) 	
	}
	catch (err){
		console.log(err)  
	}
} 

module.exports = {
	index, 
	show,
	createTrip,  
	newOne,
	removeTrip, 
	createTripsSight
}
