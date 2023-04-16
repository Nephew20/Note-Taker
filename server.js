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

app.get('/api/notes', (req, res) =>
  res.json(dbJSON)
);

// wildcard route that is used
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// initialize the server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);