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

notes.get('/:id', (req, res) => {
    console.info(`${req.method} single ID method was received`);

    // id of the note in the database
    const noteId = req.params.id;
    console.log('Note ID:', noteId);

    // reads the database to find the note 
    readFromFile('./db/db.json')
        .then((data) => {
            const jsonData = JSON.parse(data);
            console.log('JSON Data:', jsonData);

            const result = jsonData.find((note) => note.id == noteId);

            if (result) {
                res.status(200).json(result)
            } else {
                res.status(404).json('No note with this ID!')
            }


        })
        .catch((err) => {
            console.error(err);
            res.status(500).json('Error reading the database');
        });
});

//Route to add a note to the db.json 
notes.post('/', (req, res) => {

    console.info(`${req.method} method was received`)

    const { title, text } = req.body


    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4()
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

    const noteId = req.params.id;

    if (noteId) {
        readFromFile('./db/db.json')
            .then((data) => {
                const parsedlist = JSON.parse(data);
                console.log('Parsed List:', parsedlist);

                const newList = parsedlist.filter((note) => note.id !== noteId)

                console.log("New List:", newList)
                writeToFile('./db/db.json', newList)
                
                res.status(200).json()
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json('Error reading the database');
            })
    } else {
        res.status(400).json('No note found!')
    }
});


module.exports = notes