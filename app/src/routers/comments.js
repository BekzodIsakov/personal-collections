const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const comments = require("../controllers/comments");

router.get("/comments/:itemId", comments.getComments);
router.post("/comments/compose/:itemId", checkAuth, comments.composeComment);

// old
// router.post("/comments/search", comments.searchComments);

// router.delete("/comments/:id", checkAuth, comments.deleteComment);

// router.patch("/comments/:id", checkAuth, comments.editComment);

// router.post("/fakeCollections/new", comments.addNewFakeCollection);
// router.get("/fakeCollections", comments.getFakeCollections);

// router.post("/fakeItems/new", comments.addNewFakeItem);
// router.get("/fakeItems", comments.getFakeItems);

module.exports = router;
