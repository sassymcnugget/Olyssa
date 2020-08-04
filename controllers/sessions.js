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


module.exports = {
    login, 
    logout
}
