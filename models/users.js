const mongoose              = require("mongoose")
      passportLocalMongoose = require("passport-local-mongoose"); 

const userSchema = new mongoose.Schema({
	username: {	type: String,
				required: true, 
				trim: true
			},
	password: {	type: String,
				// required: true, 
				}
})

userSchema.plugin(passportLocalMongoose)
const User = mongoose.model("User", userSchema)

module.exports = User
