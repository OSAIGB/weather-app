// Setup empty JS object to act as endpoint for all routes
projectData = []
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
const port = 8000;
// Callback to debug
app.listen(port, listening);
function listening(){
    console.log(`server running`);
    console.log(`running on localhost:${port}`);
}
// Initialize all route with a callback function
app.get('/all', sendData);
// Callback function to complete GET '/all'
function sendData(req,res){
    res.send(projectData);
    projectData = [];
}
// Post Routezzzz
  app.post('/add', addData);
  function addData (req, res) {
      console.log(req.body);
      newEntry = {
          date: req.body.date,
          temp: req.body.temp,
          content: req.body.content
      }
      projectData.push(newEntry);
  }