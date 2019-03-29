// This seperates the route and the database action
// The route will trigger these functions

var db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Memes.find(req.query)
            .then(dbMeme => res.json(dbMeme))
            .catch(err => res.status(422).json(err));
    },
    save: function(req, res) {
        db.Memes.create(req.body)
            .then(dbMeme => res.json(dbMeme))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Memes.findById(req.params.id)
            .then(dbMeme => dbMeme.remove())
            .then(dbMeme => res.json(dbMeme))
            .catch(err => res.status(422).json(err));
    }
};