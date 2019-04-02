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
        console.log(req.params.review);
        // Accesses database, pass in query
        db.Memes.find(
            // query
            { 'userID': req.params.userID,
            'imageURLs': {$elemMatch: {'review': req.params.review}}
            })
            // .then(dbMemesNew => {
            //     console.log(JSON.parse(dbMemesNew));
            //     // dbMemesNew
            // })
            // Returns all that match query
            .then(dbMemesNew => {
                console.log(JSON.stringify(dbMemesNew));
                dbMemesNew.forEach(test => {
                    test
                });
                console.log(dbMemesNew.length);
                // console.log('new meme length is');
                // console.log(JSON.stringify(dbMemesNew));
                // console.log(dbMemesNew.length);
                res.json(dbMemesNew);

                // fs.writeFile("cheerio.txt", dbMemesNew, function(err) {
                //     if (err) {
                //         return console.log(err);
                //     }
                //     console.log("FS c written!");
                // });
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