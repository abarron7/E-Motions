const router = require("express").Router();
const scrapeController = require("../../controllers/scrapeController");

// Matches with "/api/scrape"
router.route("/")
    .get(scrapeController.findAll);

module.exports = router;
