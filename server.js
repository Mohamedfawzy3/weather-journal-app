let projectData = {};

// Require Express to run server
const express = require('express');
const App = express();

const bodyParser = require('body-parser');
App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());
const cors = require('cors');
App.use(cors());
// the place which server get data
App.use(express.static('website'));
//create server
const port = 3000;
const server = App.listen(port, listening);
function listening() {
  console.log(`server running on localhost: ${port}`);
};
// Post Route
const data = [];
App.post('/add', addData);
function addData(request, response) {
  projectData["date"] = request.body.date;
  projectData["temp"] = request.body.temp;
  projectData["content"] = request.body.content;
  response.send(projectData);
}

// Callback function to complete GET '/all'
App.get('/all', getData);

function getData(request, response) {
  response.send(projectData);
}
