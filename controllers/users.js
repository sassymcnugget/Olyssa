const User = require("../models/users");


const login  = (req, res) => {
    req.session.username = req.body.username 
    req.session.loggedIn = true 
    console.log(req.session)
    res.redirect('/trips')
} 

//destroy the seesion when user click on 'logout' link 
const logout = (req, res) => {
    req.session.destroy(err =>{
        if (err){
            console.log(err)
            res.redirect('/trips')
        }else{
            res.redirect('/trips')
        }
    })
}

//Path to '/users/signup/'
const newUser = (req, res) => {
	res.render("users/new.ejs")
}

//create and save user '/users/signup'
const createUser = async (req, res) => {
	try{
		 const createUser = await User.create(req.body, (err, createdUser) => {
			res.redirect("/trips")
		})
	} catch (err) {
		console.log(err)
    }} 

module.exports = {
    login, 
    logout,
    newUser,
    createUser
}
