const Trip = require("../models/trips");
// const { response } = require("express");

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
			res.render("trips/show.ejs", {trip: foundTrip})
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


module.exports = {
	index, 
	show,
	create,  
	newOne,
	removeTrip
	
}
