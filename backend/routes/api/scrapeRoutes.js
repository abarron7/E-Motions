// Directs scrape route to scrape controller

////////////////////////////////////////
///           DEPENDENCIES           ///

const router = require("express").Router();
const scrapeController = require("../../controllers/scrapeController");


////////////////////////////////////////
///              ROUTES              ///

// Matches with "/api/scrape"
router.route("/")
    .get(scrapeController.scrapeAll);

module.exports = router;
