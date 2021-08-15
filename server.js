// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require all necessary packages
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

// Start up an instance of app
var app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;

/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
  console.log(`running on localhost: ${port}`);
}

app.get("/all", (req, res) => {
  res.json(projectData);
});

app.post("/postData", (req, res) => {
  projectData = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: {
      zip: req.body.userResponse.zip,
      feelings: req.body.userResponse.feelings,
    },
  };
  res.end();
});
