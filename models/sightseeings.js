const mongoose = require("mongoose");


const sightseeingSchema = new mongoose.Schema({
	name: String,
	address: String,
	//!!!!!!!!! NOT sure if this supposed to be an array or objects 
	location: {
		latitude: Number, 
		longitude: Number 
	}, 
	img: String, 
	
});

const Sightseeing = mongoose.model("Sightseeing", sightseeingSchema);

module.exports = Sightseeing;
