const mongoose = require("mongoose");
const Sightseeing = require("./sightseeings");

const tripSchema = new mongoose.Schema({
	name: String,
	address: String,
	lng: Number,
	lat: Number,
	img: String,

	sightseeing: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Sightseeing",
		},
	],
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
