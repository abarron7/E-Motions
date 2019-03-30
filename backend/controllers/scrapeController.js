// Controls the scrape method

    ///                            ///
    ///        DEPENDENCIES        ///
    ///                            ///

// For scraping
const axios = require("axios");
const cheerio = require("cheerio");

// TEMP - Delete this
const fs = require("fs");

// DB Models
const db = require("../models");

    ///                            ///
    ///           LOGIC            ///
    ///                            ///

// Exports all scraper methods
module.exports = {

  // Scrape all methods
  findAll: function(req, res) {    
    var promises = [
        axios.get("https://wholesome-memes-only.tumblr.com/"),
        axios.get("https://wholesome-memes-only.tumblr.com/")
    ];
    // Create an empty object to store our data
    var result = [];
    // Loop over promise array and extract meme url/info/etc.
    Promise.all(promises)
        // Loop through scraped responses
        .then(scrapedResponses => {
            scrapedResponses.forEach(function(values) {
                // Load the response into cheerio and store it as a short-hand selector
                var $ = cheerio.load(values.data);
                                
                // FROM: Wholesome-Memes-Only
                $(".photo-wrapper-inner").each(function (i, element) {
                // Pull the desired information
                    // Image info
                    result.push($(this).find("a").children("img").attr("src"));
                })
            })
        })
        // Return extracted memes to DOM
        .then(() => {
            res.json(result);
            console.log(result);
        })
        // Error handling
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