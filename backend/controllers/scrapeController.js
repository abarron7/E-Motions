// imports models

// exports scraper functions (e.g. presumably there should be no DB work here)

///                            ///
///        DEPENDENCIES        ///
///                            ///

// SCRAPING
const axios = require("axios");
const cheerio = require("cheerio");

// MOMENT
const moment = require("moment");

// TEMP
const fs = require("fs");

// MODELS
const db = require("../models");

module.exports = {
  findAll: function(req, res) {    
    console.log("~~~Scrape route activated yo");

    var promises = [
        axios.get("https://wholesome-memes-only.tumblr.com/"),
        axios.get("https://wholesome-memes-only.tumblr.com/")
    ];

    Promise.all(promises)
        .then(function (scrapedResponses) {
            scrapedResponses.forEach(function(values) {
                // Load the response into cheerio and store it as a short-hand selector
                var $ = cheerio.load(values.data);
                                
                // Save from wholesome-memes-only.tumbler
                $(".photo-wrapper-inner").each(function (i, element) {

                    // Create an empty object to store our data
                    var result = {};

                    // Pull the desired information
                    // Image info
                    result.imageURL = $(this).find("a").children("img").attr("src");
                })
            })
        })
        .then(scrapedMemes => res.json(scrapedMemes))
        .catch(err => res.status(422).json(err));
    }
};




                // fs.writeFile("cheerio.txt", "", function(err) {
                //     if (err) {
                //         return console.log(err);
                //     }
                //     console.log("FS c deleted!");
                // });

                // fs.writeFile("text.txt", "", function(err) {
                //     if (err) {
                //         return console.log(err);
                //     }
                //     console.log("FS t deleted!");
                // });

                // fs.writeFile("cheerio.txt", values.data, function(err) {
                //     if (err) {
                //         return console.log(err);
                //     }
                //     console.log("FS c written!");
                // });





                // fs.appendFile("text.txt", result.imageURL + "\n\n", function(err) {
                //     if (err) {
                //         return console.log(err);
                //     }
                //     console.log("FS t line added!");
                // });  

                

                // Check if meme already exists, if not then create new document
                // db.Memes
                //     .findOne({$and: [
                //         {imageURL: result.imageURL}
                //     ]}, {limit: 1})
                //     .then(function (foundID) {
                //         if (foundID) {
                //             console.log("Meme already exists")
                //         } else {
                //             console.log("Meme doesn't exist yet - adding!")
                //             // Create result in database
                //             db.Memes.create(result)
                //                 .then(function () {})
                //                 .catch(function (error) {
                //                     return res.json(error);
                //                 });
                //         }
                //     });              