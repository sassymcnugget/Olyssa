const Trip = require("../models/trips")
const Sightseeing = require("../models/sightseeings")


//route to create new trip at '/trips/new/'
const newOne = (req, res) => {
	res.render("trips/new.ejs")
}

const create = async (req, res) => {
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

const index = async (req, res) => {
	Trip.find({}, (err, allTrips) => {
		res.render("home.ejs", {
			trips: allTrips,
		});
	});
};

const show = async (req, res) => {
	try {
		
		const foundTrip = await Trip.findById(req.params.id, (err, foundTrip) => {
			res.render("trips/show.ejs", {
				trip: foundTrip, 
				sightseeing: foundTrip.sightseeing})
		})
	} catch (err){
		console.log(err)
	}}

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

///Create a new sightseeing on Trips page 
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
	create,  
	newOne,
	removeTrip, 
	createTripsSight
}
