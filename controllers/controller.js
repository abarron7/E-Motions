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
const db = require("../models");


///                            ///
///           ROUTES           ///
///                            ///

// ** ROUTE FOR SCRAPING ** //
router.get('/scrape', function (req, res) {

    console.log("~~~Scrape route activated")

    var promises = [
        axios.get("https://wholesome-memes-only.tumblr.com/")
        // axios.get("https://www.reddit.com/r/wholesomememes/")
    ];

    Promise.all(promises)
        .then(function (scrapedResponses) {
            scrapedResponses.forEach(function(values) {
                // Load the response into cheerio and store it as a short-hand selector
                var $ = cheerio.load(values.data);

                console.log("VALUES");
                console.log("VALUES");
                console.log("VALUES");
                console.log(values.data);
                console.log("VALUES");
                console.log("VALUES");
                console.log("VALUES");

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
                    result.imageURL = $(this).find("a").children("img").attr("src");

                    fs.appendFile("text.txt", result.imageURL + "\n\n", function(err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("FS line added!");
                    });  


                

                

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

                    // Check if meme already exists, if not then create new document
                    db.Memes
                        .findOne({$and: [
                            {imageURL: result.imageURL}
                        ]}, {limit: 1})
                        .then(function (foundID) {
                            if (foundID) {
                                console.log("Meme already exists")
                            } else {
                                console.log("Meme doesn't exist yet - adding!")
                                // Create result in database
                                db.Memes.create(result)
                                    .then(function () {})
                                    .catch(function (error) {
                                        return res.json(error);
                                    });
                            }

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
        });

    });

});

    // AREA 51 - TESTING IN PROGRESS

// ** ROUTES TO SEND TO SERVER.JS ** //

// Get all memes from DB
router.get('/findall', function (req, res) {
    db.Memes.find({}, null, {
            // sort: {
            //     "momentjsstamp": 1
            // }
        })
        .then(function (memesData) {
            // Save data
            var memesData = memesData;
        })
        .catch(function (error) {
            res.json(error);
        });
});

// Save a meme
router.put('/saved-liked/:id', function (req, res) {
    db.Memes.find({
            _id: req.params.id
        })
        .then(function (memeData) {
            if (memeData[0].liked == false) {
                db.Memes.update({
                        _id: req.params.id
                    }, {
                        $set: {
                            liked: true
                        }
                    })
                    .then(function (result) {
                        res.json(result);
                    })
                    .catch(function (error) {
                        res.json(error);
                    });
            } else {
                db.Events.update({
                        _id: req.params.id
                    }, {
                        $set: {
                            saved: true,
                            "rsvp.interested": true,
                            "rsvp.going": false
                        }
                    })
                    .then(function (result) {
                        res.json(result);
                    })
                    .catch(function (error) {
                        res.json(error);
                    });
            }
        })
        .catch(function (error) {
            res.json(error);
        });

});

// Save an event as interested
router.put("/saved-interested/:id", function (req, res) {
    db.Events.find({
            _id: req.params.id
        })
        .then(function (eventData) {
            // console.log(eventData[0].rsvp.interested)
            if (eventData[0].rsvp.interested == false) {
                db.Events.update({
                        _id: req.params.id
                    }, {
                        $set: {
                            saved: true,
                            "rsvp.dismissed": false,
                            "rsvp.interested": true,
                            "rsvp.going": false
                        }
                    })
                    .then(function (result) {
                        res.json(result);
                    })
                    .catch(function (error) {
                        res.json(error);
                    });
            } else {
                db.Events.update({
                        _id: req.params.id
                    }, {
                        $set: {
                            saved: false,
                            "rsvp.interested": false
                        }
                    })
                    .then(function (result) {
                        res.json(result);
                    })
                    .catch(function (error) {
                        res.json(error);
                    });
            }
        })
        .catch(function (error) {
            res.json(error);
        });
});

// Save an event as not interested (i.e. rsvp is blank)
router.put("/saved-dismiss/:id", function (req, res) {
    db.Memes.find({
            _id: req.params.id
        })
        .then(function (eventData) {
            // console.log(eventData[0].rsvp.dismissed)
            if (eventData[0].rsvp.dismissed == false) {
                db.Events.update({
                        _id: req.params.id
                    }, {
                        $set: {
                            saved: true,
                            "rsvp.dismissed": true,
                            "rsvp.interested": false,
                            "rsvp.going": false
                        }
                    })
                    .then(function (result) {
                        res.json(result);
                    })
                    .catch(function (error) {
                        res.json(error);
                    });
            } else {
                db.Events.update({
                        _id: req.params.id
                    }, {
                        $set: {
                            saved: false,
                            "rsvp.dismissed": false
                        }
                    })
                    .then(function (result) {
                        res.json(result);
                    })
                    .catch(function (error) {
                        res.json(error);
                    });
            }
        })
        .catch(function (error) {
            res.json(error);
        });
});

// Reset
router.delete("/deleteall", function (req, res, next) {
    db.Memes.remove({}, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Delete Function - Memes deleted");
            }
        })
        .then(function () {
        })
});

module.exports = router;