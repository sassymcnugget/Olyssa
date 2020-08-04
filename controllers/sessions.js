const User = require("../models/users");


const login  = (req, res) => {
    req.session.username = req.body.username 
    req.session.loggedIn = true 
    console.log(req.session)
    res.redirect('/trips/')
		
} 

module.exports = {
    login
}
