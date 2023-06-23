const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const comments = require("../controllers/comments");

router.post("/comments/new", checkAuth, comments.addNewComment);
router.delete("/comments/:id", checkAuth, comments.deleteComment);
router.patch("/comments/:id", checkAuth, comments.editComment);

module.exports = router;
