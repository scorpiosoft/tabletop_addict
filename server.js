const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
// deployment port
const PORT = process.env.PORT || 3001;
// initialize Express
const app = express();

// get around CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers");
  next();
});

//
// Configure Middleware
//

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// serve the public folder as a static directory
app.use(express.static("public"));
// Serve up static assets
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// log routes hit
app.use(logger('dev'));

// set mongoose to use promises
mongoose.Promise = Promise;
// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/ttaddict";

// import routes and give the server access to them
const boardgameRoutes = require("./routes/api/boardgame");
app.use(boardgameRoutes);

// Start the API server
app.listen(PORT, async function() {
  try
  {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', function() {
      console.log('Connection to MongoDB established');
    });
  } catch (err) {
    console.log('Error on initial connection to MongoDB');
  }
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});