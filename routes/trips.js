const express = require("express");
const router = express.Router();
const tripController = require("../controllers/trips");

//NEW ROUTE - send the user to the new trip form page
router.get("/new", tripController.newOne);

//CREATE ROUTE - will create a new trip with data from the form
router.post("/", tripController.createTrip);

//INDEX ROUTE - send all trips in the response
router.get("/", tripController.index);

//SHOW ROUTE - send a single trip in the response
router.get("/:id", tripController.show);

//API ROUTE - send a single trip in the response
router.get("/api/:id", tripController.showData);

//DELETE ROUTE - remove a single trip from the array and redirect the user to index
router.delete("/:id", tripController.removeTrip);

module.exports = router;
