// Import Express.js
const express = require('express');
const path = require('path')

//imports api router files
const api = require('./routes/index')
const app = express();

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

// wildcard route that is used
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// initialize the server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);