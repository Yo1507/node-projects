const fs = require('fs');
const _ = require('lodash')

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body,
    };
    var duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var getAll = () => {
    return fetchNotes();
};

var getNote = (title, body) => {
    var notes = fetchNotes();
    var note = notes.find((note) => note.title === title);
    if (!_.isUndefined(note)) {
        return note;
    }
};

var removeNote = (title) => {
    var notes = fetchNotes();
    var noteToDelete = notes.find((note) => note.title === title);
    if (!_.isUndefined(noteToDelete)) {
        notes = _.pull(notes, noteToDelete);
        saveNotes(notes);
        return true;
    }
    return false
        // var filteredNotes = notes.filter((note) => note.title !== title);
        // saveNotes(filteredNotes);
};

var logNote = (note) => {
    note = { title: "things to do", body: "go to hell" };
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote,
};