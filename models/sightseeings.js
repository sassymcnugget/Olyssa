const mongoose = require("mongoose");


const sightseeingSchema = new mongoose.Schema({
	name: String,
	address: String,
	lng: Number, 
	lat: Number,  
	img: String
	
});

const Sightseeing = mongoose.model("Sightseeing", sightseeingSchema);

module.exports = Sightseeing;
