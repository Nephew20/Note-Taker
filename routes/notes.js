const notes = require('express').Router();
const {readFromFile, readAndAppend} = require('../helpers/fsUtils')
const uuid = require('../helpers/uuid')

//Route to generate the api notes from the db.json
notes.get('/', (req, res) => {
    console.info(`${req.method} method was received`)
    readFromFile('./Develop/db/db.json').then((data) => res.json(JSON.parse(data)));
});

//Route to add a note to the express json 
notes.post('/', (req, res) => {
  
  console.info(`${req.method} method was received`)
  
  const {title, text} = req.body

  if (req.body) {
    const newNote = {
        title,
        text,
        note_id: uuid()
    };

    readAndAppend(newNote, './Develop/db/db.json');
    res.json("A Note was added successfully")
  }
});

module.exports = notes