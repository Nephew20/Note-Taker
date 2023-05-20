const notes = require('express').Router();
const dbJSON = require('../Develop/db/db.json');

//Route to generate the api notes from the db.json
notes.get('/', (req, res) =>
  res.json(dbJSON)
);

//Route to add a note to the express json 
notes.post('/', (req, res) => {
  
  console.info(`${req.method} method was received`)
  
 if (req.body && req.body.title) {
  dbJSON.push(req.body)
  res.json(`A new review has been added called ${req.body.title}`)
 } 
});

module.exports = notes