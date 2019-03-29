///                            ///
///        DEPENDENCIES        ///
///                            ///

// EXPRESS
const express = require("express");
const router = express.Router();

// SCRAPING
const axios = require("axios");
const cheerio = require("cheerio");

// MOMENT
const moment = require("moment");

// TEMP
const fs = require("fs");

// MODELS
// const db = require("../models");

    // AREA 51 - TESTING IN PROGRESS
    // AEG Events Group
    var promises = [
        axios.get("https://wholesome-memes-only.tumblr.com/")
        // axios.get("https://www.reddit.com/r/wholesomememes/")
    ];

    Promise.all(promises)
        .then(function (scrapedResponses) {
            scrapedResponses.forEach(function(values) {
                // Load the response into cheerio and store it as a short-hand selector
                var $ = cheerio.load(values.data);

                fs.writeFile("text.txt", "", function(err) {
                    if (err) {
                        return console.log(err);
                    }

                    console.log("FS deleted!");
                });
                                
                // Save the desired information from the site
                $(".photo-wrapper-inner").each(function (i, element) {

                    // Create an empty object to store our data
                    var result = {};

                    // Pull the desired information
                    // Image info
                    result.image = $(this).find("a").children("img").attr("src");

                    fs.appendFile("text.txt", result.image + "\n\n", function(err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("FS line added!");
                    });  

                });
                
                console.log("done");
                

                //     // Date
                //     result.date = $(this).find(".info").children(".date-time-container").children(".date").text().trim();
                //     // Location
                //     result.venue = location;
                //     // Time
                //     result.time = $(this).find(".info").children(".date-time-container").children(".time").text().replace("Show", "").trim();
                //     // Time and Date
                //     result.momentjsstamp = moment(result.date + " " + result.time, "ddd, MMM D, YYYY h:mm a").format();
                //     // Event Link
                //     result.eventlink = $(this).find(".thumb").children("a").attr("href");
                //     // Image thumbnail
                //     result.imgthumb = $(this).find(".thumb").children("a").children("img").attr("src");
                //     // Ticket Status
                //     result.ticketstatus = $(this).find(".buttons").children("a").attr("title");
                //     // Support Act
                //     var supportact = $(this).find(".info").children(".title").children("h4").text().trim();
                //     if (supportact.startsWith("with ")) {
                //         supportact = supportact.replace("with special guests: ", "");
                //         supportact = supportact.replace("with special guest: ", "");
                //         supportact = supportact.replace("with special guests ", "");
                //         supportact = supportact.replace("with special guest ", "");
                //         supportact = supportact.replace("with ", "");
                //     }
                //     result.supportact = supportact;

                //     // Check if event already exists, if not then create new document
                //     db.Events
                //         .findOne({$and: [
                //             {artist: result.artist},
                //             {momentjsstamp: result.momentjsstamp},
                //             {eventlink: result.eventlink}
                //         ]}, {limit: 1})
                //         .then(function (foundID) {
                //             if (foundID) {
                //                 console.log("Event already exists")
                //             } else {
                //                 console.log("Event doesn't exist yet - adding!")
                //                 // Create result in database
                //                 db.Events.create(result)
                //                     .then(function () {})
                //                     .catch(function (error) {
                //                         return res.json(error);
                //                     });
                //             }

                //         // Delete any events that are dated before today (0) or three days ahead (3)
                //         var midnightTonight = moment().startOf("day").add(0, "days").format();
                //         db.Events.find({momentjsstamp: {$lt: midnightTonight}}, null, {sort: {artist: 1}})
                //             .then(function (eventsData) {
                //                 for (i = 0; i < eventsData.length; i++) {
                //                     console.log("artist concert deleted " + eventsData[i].artist);
                //                 }
                //             });
                //         db.Events.deleteMany({momentjsstamp: {$lt: midnightTonight}}, function (i, err) {
                //             if (err) {
                //                 console.log(err);
                //             }   
                //         });

                //         console.log("ENTIRE PROCESS COMPLETED???")
                //     });
                // });


    });

});
