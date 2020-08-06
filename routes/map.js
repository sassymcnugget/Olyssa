const express = require("express");
const mapRouter = express.Router();
const mapController = require("../controllers/map");

// // NEW ROUTE - send the user to the new fruit form page
mapRouter.get("/new", mapController.newOne);

// CREATE ROUTE - will create a new fruit with data from the form
mapRouter.post("/", mapController.create);

// INDEX ROUTE - send all fruits in the response
mapRouter.get("/", mapController.index);

// SHOW ROUTE - send a single fruit in the response
//mapRouter.get("/:id", mapController.show);

// // DELETE ROUTE - remove a single fruit from the array and redirect the user to index
mapRouter.delete("/:id", mapController.removeTrip);

mapRouter.post("/:id", mapController.createTripsSight);

module.exports = mapRouter;
