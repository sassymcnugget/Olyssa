const mongoose = require("mongoose");
const Sightseeing = require("./sightseeings");

const tripSchema = new mongoose.Schema({
	name: String,
	address: String,
	lat: Number, 
	lng: Number, 
	//!!!!!!!!! NOT sure if this supposed to be an array or objects 
	// latitude: Number, 
	// longitude: Number, 
	// coordinates: {
	// 	type: [Number],
	// 	index: '2dsphere'
	//   },
	img: String, 
	// creating a relationship through a reference
	sightseeing: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Sightseeing",
		},
	],
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
