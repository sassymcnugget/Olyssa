const mongoose = require("mongoose");
const Sightseeing = require("./sightseeings");

const tripSchema = new mongoose.Schema({
	name: String,
	address: String,
	//!!!!!!!!! NOT sure if this supposed to be an array or objects 
	// latitude: Number, 
	// longitude: Number, 
	location: {
		latitude: String, ///trip.locations.latitude 
		longitude: Number 
	}, 
	img: String, 
	// creating a relationship through a reference
	// sightseeing: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "Sightseeing",
	// 	},
	// ],
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
