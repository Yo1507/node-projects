const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

const titleOption = {
    title: {
        describe: 'Title of note',
        demand: true,
        alias: 't'
    }
};
const bodyOption = {
    body: {
        describe: 'Content of the note.',
        demand: true,
        alias: 'b'
    }
};

const argv = yargs.command('add', 'Add a new note.', titleOption, bodyOption)
    .command('list', 'List all notes.')
    .command('read', 'Read a note', titleOption)
    .command('remove', 'Remove a note.', titleOption)
    .help().argv;

var command = argv._[0];
console.log('Command', command);
console.log('Process', process.argv);
console.log('Yargs', argv);

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (_.isUndefined(note)) {
        console.log(`Note ${argv.title} already exists.`);
    } else {
        console.log(`Note ${note.title} created.`);
    }
} else if (command === 'list') {
    var noteList = notes.getAll();
    if (_.isUndefined(noteList) || _.isEmpty(noteList)) {
        console.log("Unable to find notes.");
    } else {
        console.log(`Printing ${noteList.length} note(s).`);
        _.forEach(noteList, function(value) {
            console.log(`Note : ${value.title}`, `\t Content : ${value.body}`);
        });
    }
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (_.isUndefined(note)) {
        console.log(`Note ${argv.title} doesn't exist.`);
    } else {
        console.log(`Note ${note.title} : ${note.body}`);
    }
} else if (command === 'remove') {
    var isDeleted = notes.removeNote(argv.title);
    if (isDeleted) {
        console.log(`Note ${argv.title} is deleted`);
    } else {
        console.log(`Note ${argv.title} doesn't exists.`);
    }
} else if (command == 'log') {
    notes.logNote();
} else {
    console.log('Command not recognized');
}