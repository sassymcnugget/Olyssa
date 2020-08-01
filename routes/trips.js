const express = require('express')
const router = express.Router()
const tripController = require('../controllers/trips')

// // NEW ROUTE - send the user to the new fruit form page
router.get('/new', tripController.newOne)

// CREATE ROUTE - will create a new fruit with data from the form
router.post('/', tripController.create)

// INDEX ROUTE - send all fruits in the response
router.get('/', tripController.index)

// SHOW ROUTE - send a single fruit in the response
router.get('/:id', tripController.show)

// // DELETE ROUTE - remove a single fruit from the array and redirect the user to index
// router.delete('/:id', (request, response) => {
//     Fruit.findByIdAndDelete(request.params.id, (err, data) => {
//         response.redirect('/fruits')
//     })
// })
// // EDIT ROUTE - show the user a page with a form they can use to edit a specific item
// router.get('/:id/edit', (request, response) => {
//     Fruit.findById(request.params.id, (err, foundFruit) => {
//         // rendering the edit.ejs
//         response.render('edit.ejs', {
//             // the fruit object
//             fruit: foundFruit
//         })
//     })
// }) 

// // UPDATE ROUTE - provide the functionality allowing a user to change aspects of a given fruit
// router.put('/:id', (request, response) => {
//     // TERNARY OPERATOR - <condition> ? <TRUE result> : <FALSE result>
//     request.body.readyToEat === 'on' ? request.body.readyToEat = true : request.body.readyToEat = false

//     Fruit.findByIdAndUpdate(request.params.id, request.body, () => {
//         response.redirect('/fruits')
//     })
// })

module.exports = router