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
// // EDIT ROUTE - show the user a page with a form they can use to edit a specific item
// mapRouter.get('/:id/edit', (request, response) => {
//     Fruit.findById(request.params.id, (err, foundFruit) => {
//         // rendering the edit.ejs
//         response.render('edit.ejs', {
//             // the fruit object
//             fruit: foundFruit
//         })
//     })
// })

// // UPDATE ROUTE - provide the functionality allowing a user to change aspects of a given fruit
// mapRouter.put('/:id', (request, response) => {
//     // TERNARY OPERATOR - <condition> ? <TRUE result> : <FALSE result>
//     request.body.readyToEat === 'on' ? request.body.readyToEat = true : request.body.readyToEat = false

//     Fruit.findByIdAndUpdate(request.params.id, request.body, () => {
//         response.redirect('/fruits')
//     })
// })

module.exports = mapRouter;
