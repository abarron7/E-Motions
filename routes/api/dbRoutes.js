// Directs DB routes to DB controller

      ///   DEPENDENCIES   ///
const router = require("express").Router();
const dbController = require("../../controllers/dbController");

     ///   ROUTES   ///
// Matches with "/api/memes/:userID/:review"
router.route("/:userID/:review")
  .get(dbController.findAllSaved)

// Matches with "/api/memes"
router.route("/")
  .post(dbController.saveMeme);

// Matches with "/api/memes/:id"
router.route("/:id")
  .delete(dbController.deleteMeme);

module.exports = router;
