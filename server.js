//Import Express.js
const express = require('express');
const path = require('path')

//Imports api router files
const api = require('./routes/index')
const app = express();

//Port variable for access to Heroku
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api)
app.use(express.static('public'));

//Notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//Wildcard route to direct user to main page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

//Initialize the server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);