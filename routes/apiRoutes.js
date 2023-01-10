const router = require('express').Router();
const store = require('../db/store');
router.get("/notes", function(req, res) {
  store
    .getNotes()
    .then(function(notes) {
      res.json(notes);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});

router.post("/notes", function(req, res) {
  store
    .addNote(req.body)
    .then(function(note) {
      res.json(note);
    })
    .catch(function(err) {
      res.status(500).json(err);
    });
});
module.exports = router;