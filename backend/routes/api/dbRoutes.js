// Directs DB routes to DB controller

      ///   DEPENDENCIES   ///
const router = require("express").Router();
const dbController = require("../../controllers/dbController");

     ///   ROUTES   ///
// Matches with "/api/memes"
router.route("/")
  .get(dbController.findAllSaved)
  .post(dbController.save);

// Matches with "/api/memes/:id"
router.route("/:id")
  .delete(dbController.remove);

module.exports = router;
