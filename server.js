// Import Express.js
const express = require('express');
const path = require('path')
const dbJSON = require('./Develop/db/db.json');

const app = express();

const PORT = 3001;

app.use(express.static('public'));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Route to generate the api notes from the db.json
app.get('/api/notes', (req, res) =>
  res.json(dbJSON)
);

//Route to add a note to the express json 
app.post('/api/notes', (req, res) => {
  
  console.info(`${req.method} method was received`)
  
 if (req.body && req.body.title) {
  dbJSON.push(req.body)
  res.json(`A new review has been added called ${req.body.title}`)
 } 
});

// wildcard route that is used
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// initialize the server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);