                ///                            ///
                ///        DEPENDENCIES        ///
                ///                            ///

// EXPRESS
var express = require("express");
var router = express.Router();

// MODELS
var db = require("../models");


                ///                            ///
                ///           ROUTES           ///
                ///                            ///

        // ** ROUTES FOR SAVED ITEMS ** //

// Get all saved events from DB
router.get("/events-saved", function(req, res) {
    db.Events.find({})
    .then(function(eventsData) {
        // Save all data into handlebars object
        var hbsObject = {events:eventsData};
        // console.log(hbsObject);
        res.render("saved", hbsObject);
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Get all dismissed events from DB
router.get("/events-deleted", function(req, res) {
    db.Events.find({})
    .then(function(eventsData) {
        // Save all data into handlebars object
        var hbsObject = {events:eventsData};
        // console.log(hbsObject);
        res.render("deleted", hbsObject);
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Save an event as going
router.put("/saved-going/:id", function(req, res) {
    db.Events.find({_id: req.params.id})
    .then(function(eventData) {
        if (eventData[0].rsvp.going == false) {
            db.Events.update(
                {_id: req.params.id},
                {$set:
                    {
                        saved: true,
                        "rsvp.dismissed": false,
                        "rsvp.interested": false,
                        "rsvp.going": true
                    }
                }
            )
            .then(function(result) {
                res.json(result);
            })
            .catch(function(error) {
                res.json(error);
            });
        } else {
            db.Events.update(
                {_id: req.params.id},
                {$set:
                    {
                        saved: true,
                        "rsvp.interested": true,
                        "rsvp.going": false
                    }
                }
            )
            .then(function(result) {
                res.json(result);
            })
            .catch(function(error) {
                res.json(error);
            });
        }
    })
    .catch(function(error) {
        res.json(error);
    });
    
});

// Save an event as interested
router.put("/saved-interested/:id", function(req, res) {
    db.Events.find({_id: req.params.id})
    .then(function(eventData) {
        console.log(eventData[0].rsvp.interested)
        if (eventData[0].rsvp.interested == false) {
            db.Events.update(
                {_id: req.params.id},
                {$set:
                    {
                        saved: true,
                        "rsvp.dismissed": false,
                        "rsvp.interested": true,
                        "rsvp.going": false
                    }
                }
            )
            .then(function(result) {
                res.json(result);
            })
            .catch(function(error) {
                res.json(error);
            });
        } else {
            db.Events.update(
                {_id: req.params.id},
                {$set:
                    {
                        saved: false,
                        "rsvp.interested": false
                    }
                }
            )
            .then(function(result) {
                res.json(result);
            })
            .catch(function(error) {
                res.json(error);
            });
        }
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Save an event as not interested (i.e. rsvp is blank)
router.put("/saved-dismiss/:id", function(req, res) {
    db.Events.find({_id: req.params.id})
    .then(function(eventData) {
        console.log(eventData[0].rsvp.dismissed)
        if (eventData[0].rsvp.dismissed == false) {
            db.Events.update(
                {_id: req.params.id},
                {$set:
                    {
                        saved: true,
                        "rsvp.dismissed": true,
                        "rsvp.interested": false,
                        "rsvp.going": false
                    }
                }
            )
            .then(function(result) {
                res.json(result);
            })
            .catch(function(error) {
                res.json(error);
            });
        } else {
            db.Events.update(
                {_id: req.params.id},
                {$set:
                    {
                        saved: false,
                        "rsvp.dismissed": false
                    }
                }
            )
            .then(function(result) {
                res.json(result);
            })
            .catch(function(error) {
                res.json(error);
            });
        }
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Get specific event from DB, populate with notes
router.get("/getnotes/:id", function(req, res) {
    // Find event by req.params.id
    db.Events.findOne(
        {_id: req.params.id}
    )
    // Populate with notes
    .populate("notes")
    .then(function(dbEvent) {
        res.json(dbEvent);
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Save a note and assocaite with event
router.post("/postnotes/:id", function(req, res) {
    // Save note
    db.Notes.create(req.body)
    // Associate note
    .then(function(dbNote) {
        return db.Events.findOneAndUpdate(
            {_id: req.params.id},
            {$push:
                {notes: dbNote._id}
            },
            {new: true}
        );
    })
    .then(function(dbEvent) {
        res.json(dbEvent);
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Update a note
router.get("/getsinglenote/:id", function(req, res) {
    db.Notes.findOne(
        {_id: req.params.id}
    )
    .then(function(result) {
        res.json(result);
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Delete a note
router.delete("/deletenote/:id", function(req, res) {
    db.Notes.remove(
        {_id: req.params.id}
    )
    .then(function(dbNote) {
        res.json(dbNote);
    })
    .catch(function(error) {
        res.json(error);
    });
});

// Unsave an event
router.put("/returned/:id", function(req, res) {
    // Update event saved from true to false
    db.Events.update(
        {_id: req.params.id},
        {saved: false}
    )
    .then(function(result) {
        res.json(result);
    })
    .catch(function(error) {
        res.json(error);
    });
});

module.exports = router;