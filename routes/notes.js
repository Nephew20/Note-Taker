const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { json } = require('express');


//Route to get the notes from the db.json
notes.get('/', (req, res) => {
    console.info(`${req.method} method was received`)
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

// notes.get('/:id', (req, res) => {
//     console.info(`${req.method} method was received`);

//     // id of the note in the database
//     const noteId = req.params.id;
//     console.log('Note ID:', noteId);

//     // reads the database to find the note 
//     readFromFile('./db/db.json')
//         .then((data) => {
//             const jsonData = JSON.parse(data);
//             console.log('JSON Data:', jsonData);

//             const result = jsonData.find((note) => note.note_id === noteId);

//             if (result) {
//                 res.status(200).json(result)
//             } else {
//                 res.status(404).json('No note with this ID!')
//             }

            
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(500).json('Error reading the database');
//         });
// });

//Route to add a note to the db.json 
notes.post('/', (req, res) => {

    console.info(`${req.method} method was received`)

    const { title, text } = req.body


    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuidv4()
        };

        readAndAppend(newNote, './db/db.json')
        res.status(200).json('A new note has been passed')

    } else {
        res.status(400).json('Note not added!!')
    }
})


//Route to delete a note from db.json
notes.delete('/:id', (req, res) => {
    console.info(`${req.method} method was received`);

    const targetID = req.params.id;

    if (targetID) {
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            } else {
                const parsedlist = JSON.parse(data);
                for (let i = 0; i < parsedlist.length; i++) {
                    if (parsedlist[i].note_id === targetID) {
                        parsedlist.splice(i, 1);
                        console.log(parsedlist)
                        return parsedlist;
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

    }
});


module.exports = notes