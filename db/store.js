const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  getNotes() {
    var self = this;
    return this.read().then(function(notes) {
      let parsedNotes;
      
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }

  addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    const newNote = { title, text, id: uuidv1() };

    var self = this;
    return this.getNotes()
      .then(function(notes) {
        return [].concat(notes, newNote);
      })
      .then(function(updatedNotes) {
        return self.write(updatedNotes);
      })
      .then(function() {
        return newNote;
      });
  }
}

module.exports = new Store();
