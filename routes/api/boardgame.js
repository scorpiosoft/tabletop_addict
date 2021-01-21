const router = require("express").Router();
const boardgameController = require("../../controllers/boardgameController");

router.route("/api/boardgame/age")
  .get(boardgameController.getAge)
  .post(boardgameController.setAge);

// Matches with "/api/boardgame/:id"
// router
//   .route("/:id")
//   .get(boardgameController.findById)
//   .put(boardgameController.update)
//   .delete(boardgameController.remove);

module.exports = router;