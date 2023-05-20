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
           const parsedData = JSON.parse(data)

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

//Route to delete a note
notes.delete('/:id', (req, res) => {
    console.info(`${req.method} method was received`)

    const id = req.params.id;
    fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {
        if (err) {
        console.error(err);
        return;
        } else {
        const parsedlist = JSON.parse(data)
        for (i=0; i<parsedlist.length; i++) {
            if(parsedlist[i].id === id) {
                parsedlist.splice(i, 1)
            };
            console.log(parsedlist[i].note_id)
        };
    
        fs.writeFile('./Develop/db/db.json', JSON.stringify(parsedlist, null, 1), err => {
            if (err) {
            console.error(err);
            } else {
                console.info('A note has been deleted')
            }
        });
}})

})
module.exports = notes