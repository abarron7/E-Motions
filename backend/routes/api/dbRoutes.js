// Routes of this kind will trigger api functions

const router = require("express").Router();
const dbController = require("../../controllers/dbController");

// Matches with "/api/memes"
router.route("/")
  .get(dbController.findAll)
  .post(dbController.save);

// Matches with "/api/memes/:id"
router.route("/:id")
  .delete(dbController.remove);

module.exports = router;
