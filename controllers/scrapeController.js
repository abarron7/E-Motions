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

  // Scrape all method
  scrapeAll: function(req, res) {

    var urlInstagram = "https://www.instagram.com/wholesomememes/";
    var urlTumblr = "https://wholesome-memes-only.tumblr.com/";
    var urlPleated = "https://pleated-jeans.com/2019/03/25/wholesome-memes-5/";
    var urlTwenty = "https://twentytwowords.com/wholesome-memes-that-are-so-emotionally-nourishing-the-rest-of-the-internet-will-seem-like-utter-rubbish/";
    var urlKISW = "https://kisw.radio.com/blogs/vicky-barcelona/wholesome-memes";
    var urlDroid = "https://www.memedroid.com/memes/tag/wholesome";

    var promises = [
    // doesnt work
        // axios.get(urlInstagram),
    // WORKS
        // axios.get(urlTumblr),
    // WORKS
        axios.get(urlPleated),
    // doesnt work
        // axios.get(urlTwenty),
    // doesnt work
        // axios.get(urlKISW),
    // WORKS
        // axios.get(urlDroid),
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

                // Loops through scraped sites and scrapes them individually
                switch(values.config.url) {

                    case urlInstagram:
                        // console.log("Confirmed - Insta");
                        $(".KL4Bh").each(function () {
                            // imageURL
                            result.push($(this).find("img").attr("src"));
                        })
                        break;

                    case urlTumblr:
                        // console.log("Confirmed - Tumblr");
                        $(".photo-wrapper-inner").each(function () {
                            // imageURL
                            result.push($(this).find("a").children("img").attr("src"));
                        })
                        break;

                    case urlPleated:
                        // console.log("Confirmed - Pleated");
                        $(".size-full").each(function () {
                            // imageURL
                            result.push($(this).attr("src"));
                        })
                        break;

                    case urlTwenty:
                        // console.log("Confirmed - Twenty");
                        // $(".size-full").each(function () {
                        //     // imageURL
                        //     result.push($(this).attr("src"));
                        // })
                    break;
                    
                    case urlKISW:
                        // console.log("Confirmed - KISW");
                        $(".NaturalImage-image").each(function () {
                            // imageURL
                            result.push($(this).attr("src"));
                        })
                        // console.log(result)
                    break;
                    
                    case urlDroid:
                        // console.log("Confirmed - Droid");
                        $(".gallery-item").each(function () {
                            // imageURL
                            result.push($(this).find(".item-aux-container").children("a").children("img").attr("src"));
                        })
                        // console.log(result)
                    break;

                    default:
                        // console.log('default');
                }

            }) // Ends forEach loop
        })
        
        // Return extracted memes to DOM
        .then(() => {
            res.json(result);
            // console.log(result);
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