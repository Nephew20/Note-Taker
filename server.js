// Import Express.js
const express = require('express');
const path = require('path')
const dbJSON = require('./Develop/db/db.json');

const app = express();

const PORT = 3001;

app.use(express.static('public'));

// notes page

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// wildcard route that is used
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);