const notes = require('express').Router();
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

//Route to get the notes from the db.json
notes.get('/', (req, res) => {
    console.info(`${req.method} method was received`)
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        } else {
        allNotes = JSON.parse(data)
        res.json(allNotes);
    }});
});

//Route to add a note to the db.json 
notes.post('/', (req, res) => {
  
  console.info(`${req.method} method was received`)
  
  const {title, text} = req.body

  
  if (req.body) {
    const newNote = {
        title,
        text,
        id: uuidv4()
  };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
            console.error(err);
            return;
            } else {
           const parsedData = JSON.parse(data)

            parsedData.push(newNote)
        ;

        fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 1), err => {
            if (err) {
            console.error(err);
            } else {
                console.info('New note has been added!')
            }
        });
    }})
}})

//Route to delete a note from db.json
notes.delete('/:id', (req, res) => {
    console.info(`${req.method} method was received`);

    const id = req.params.id;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        } else {
            const parsedlist = JSON.parse(data);
            for (let i = 0; i < parsedlist.length; i++) {
                if (parsedlist[i].id === id) {
                    parsedlist.splice(i, 1);
                    return; 
                }
            }

            fs.writeFile('./db/db.json', JSON.stringify(parsedlist, null, 1), err => {
                if (err) {
                    console.error(err);
                } else {
                    console.info('A note has been deleted');
                }
            });
        }
    });
});


module.exports = notes