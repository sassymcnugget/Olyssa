const Sightseeing = require("../models/sightseeings");
const Trip = require("../models/trips");

///Create a new sightseeing on Trips show page ('/trip/id')
const create = async(req, res) => {
	try{
		const createdSight = await Sightseeing.create(req.body) 
		 //first create the sight and then find Trip by id 
		Trip.findById(req.body.tripId, (err, updatedTrip) =>{
			updatedTrip.sightseeing.push(createdSight)
			updatedTrip.save((err, result) => {
				res.redirect(`/trips/${ req.body.tripId }`)
			})
		}) 	
	}
	catch (err){
		console.log(err)  
	}
} 
// //Delete route for sightseeings 
const deleteSight = async(req, res) => {
	try{
		const deleteSight = await Sightseeing.findByIdAndDelete(req.params.id)
		const foundTrip = await Trip.findOne({'sightseeing': req.params.id })
		await foundTrip.sightseeing.remove(req.params.id)
		await foundTrip.save()
		res.redirect(`/trips/${foundTrip.id}`)

	}
	catch (err) {
		console.log(err)
	}
}

module.exports = {
	create,
	deleteSight
}
