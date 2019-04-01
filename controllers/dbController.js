// Controls the Mongoose DB methods

// Import DB model
var db = require("../models");

// Export all methods
module.exports = {

    findAllSaved: function(req, res) {
        // Accesses database, pass in query
        db.Memes.find(req.query)
            // Returns all that match query
            .then(dbMeme => res.json(dbMeme))
            // Error handling
            .catch(err => res.status(422).json(err));
    },
    
    saveMeme: function(req, res) {
        db.Memes.create(req.body)
            .then(dbMeme => res.json(dbMeme))
            .catch(err => res.status(422).json(err));
    },
    
    deleteMeme: function(req, res) {
        db.Memes.findById(req.params.id)
            .then(dbMeme => dbMeme.remove())
            .then(dbMeme => res.json(dbMeme))
            .catch(err => res.status(422).json(err));
    }
};