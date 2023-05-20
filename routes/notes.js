const notes = require('express').Router();
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

//Route to generate the api notes from the db.json
notes.get('/', (req, res) => {
    console.info(`${req.method} method was received`)
    fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        } else {
        allNotes = JSON.parse(data)
        res.json(allNotes);
    }});
});

//Route to add a note to the express json 
notes.post('/', (req, res) => {
  
  console.info(`${req.method} method was received`)
  
  const {title, text} = req.body

  
  if (req.body) {
    const newNote = {
        title,
        text,
        note_id: uuidv4()
  };

        fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
            if (err) {
            console.error(err);
            return;
            } else {
            parsedData = JSON.parse(data)

            parsedData.push(newNote)
        ;

        fs.writeFile('./Develop/db/db.json', JSON.stringify(parsedData, null, 1), err => {
            if (err) {
            console.error(err);
            } else {
                console.info('New note has been added!')
            }
        });
    }})
}})


notes.delete('/:id', (req, res) => {
    console.info(`${req.method} method was received`)

    const id = req.params.note_id;
    readFromFile('./Develop/db/db.json').then((data) => res.json(JSON.parse(data)))

    JSON.parse(data) = notesList

    for (i=0; i<notesList.length; i++) {
        if (notesList[i].note_id === id) {
            notesList.splice(i, 1)
        }
    } 

    readAndAppend(notesList, './Develop/db/db.json')
    res.json('The note is deleted')
})


module.exports = notes