//require statements
const express               = require("express");
	  mongoose              = require("mongoose");
	  passport              = require("passport");
	  localStrategy         = require("passport-local");
	  passportLocalMongoose = require("passport-local-mongoose"); 
      methodOverride        = require("method-override");
      session               = require("express-session");
	  
const User = require("./models/users.js");

require("dotenv").config();

const app = express();

// database connection
const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

// mongoose.connect( process.env.MONGODB_URI || "YOUR CURRENT LOCALHOST DB CONNECTION STRING HERE" );

mongoose.connection.on("connected", () =>
	console.log(`Mongoose connected to ${connectionString}`)
);
mongoose.connection.on("disconnected", () =>
	console.log("Mongoose disconnected")
);
mongoose.connection.on("error", (err) => console.log("Mongoose error", err));

//middleware
app.set("view engine", "ejs");

//User session
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(methodOverride("_method"));

// parse incoming data into a JS object attached to the request
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set location from which to pull static files
app.use(express.static("static"));

//connect passport packages 
app.use(passport.initialize());
app.use(passport.session()); 

//read and encode data from the session 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());

// routes
const tripsRouter = require("./routes/trips.js");
app.use("/trips", tripsRouter);

const sightseeingsRouter = require("./routes/sightseeings.js");
app.use("/sightseeings", sightseeingsRouter);

const userRouter = require("./routes/users.js");
app.use("/users", userRouter);

app.listen(process.env.PORT || 3000) 
