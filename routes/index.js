// Directs all routes

////////////////////////////////////////
///           DEPENDENCIES           ///

const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");


////////////////////////////////////////
///              ROUTES              ///

// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
// router.use(function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/src/pages/Home.jsx"));
// });

module.exports = router;