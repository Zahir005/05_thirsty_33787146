// Setup express and ejs
var express = require('express');
var ejs = require('ejs');
      



// Create the express application object
const app = express();
const port = 8000;

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');


// Set up the body parser 
app.use(express.urlencoded({ extended: true })); 

const path = require('path');

// Serve a single CSS file from wherever it lives
app.get('/styles.css', (req, res) => {
  
  res.sendFile(path.join(__dirname, 'styles.css'));


});

// Load the route handlers
const mainRoutes = require("./routes/main");  
app.use('/', mainRoutes);

// Start the web app listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

