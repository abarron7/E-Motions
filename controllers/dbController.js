// Controls the Mongoose DB methods

// Import DB model
var db = require("../models");

// TEMP - Delete this
const fs = require("fs");


// Export all methods
module.exports = {

    findAllSaved: function(req, res) {
        console.log("firing this");
        console.log(req.params.userID);
        // Accesses database, pass in query
        db.Memes
            // query
            .find({ 'userID': req.params.userID })
            // return object with id, imageurl and review
            .then(dbMemes => {
                res.json(dbMemes[0].imageURLs);
            })
            // Error handling
            .catch(err => res.status(422).json(err));
    },
    
    saveMeme: function(req, res) {
        console.log('Runnning save meme');
        // console.log(req.body);
        db.Memes.update(
            // query
            {'userID': req.body.userID,
            'imageURLs': {$elemMatch: {'imageURL': req.body.imageURL}}},
            // update
            { $set: { 'imageURLs.$.review': req.body.review}}
        )
        .then(dbMemes => res.json(dbMemes))
        .catch(err => res.status(422).json(err));
    },
    
    deleteMeme: function(req, res) {
        db.Memes.findById(req.params.id)
            .then(dbMeme => dbMeme.remove())
            .then(dbMeme => res.json(dbMeme))
            .catch(err => res.status(422).json(err));
    }
};