//require statements
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();

// database connection
//const connectionString = "mongodb+srv://olb:olga22@cluster0.wif1u.mongodb.net/olyssa?retryWrites=true&w=majority";
const connectionString = 'mongodb://localhost/project2'

mongoose.connect(connectionString, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

mongoose.connection.on("connected", () =>
	console.log(`Mongoose connected to ${connectionString}`)
);
mongoose.connection.on("disconnected", () =>
	console.log("Mongoose disconnected")
);
mongoose.connection.on("error", (err) => console.log("Mongoose error", err));

//middleware
app.use(methodOverride("_method"));

// parse incoming data into a JS object attached to the request
app.use(express.urlencoded({ extended: false }));

// routes
const tripsRouter = require("./routes/trips.js");
app.use("/trips", tripsRouter);

const sightseeingsRouter = require("./routes/sightseeings.js");
app.use("/sightseeings", sightseeingsRouter);

// listening
app.listen(3000, () => {
	console.log("I'm listening!");
});
