// Directs all API routes

////////////////////////////////////////
///           DEPENDENCIES           ///

const path = require("path");
const router = require("express").Router();
const dbRoutes = require("./dbRoutes");
const scrapeRoutes = require("./scrapeRoutes");


////////////////////////////////////////
///              ROUTES              ///

// Memes routes match /api/memes
router.use("/memes", dbRoutes);

// Scraper Routes match /api/scraper
router.use("/scrape", scrapeRoutes);

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/src/pages/Home.jsx"));
});

module.exports = router;
