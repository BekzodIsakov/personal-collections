const express = require("express");
const router = express.Router();
const items = require("../controllers/items");
const checkAuth = require("../middlewares/checkAuth");

router.get("/items", items.getItems);

router.get("/items/:id", items.getItemById);

router.post("/items/new", checkAuth, items.createNewItem);

router.patch("/items/:id", checkAuth, items.updateItem);

router.delete("/items/:id", checkAuth, items.deleteItem);

router.patch("/items/:id/react", checkAuth, items.likeUnlikeItem);

router.get("/items/:id/comments", items.getItemComments);

router.post("/items/:id/comments/new", checkAuth, items.addNewComment);

router.patch("/items/:id/comments/:commentId", checkAuth, items.updateComment);

router.delete("/items/:id/comments/:commentId", checkAuth, items.deleteComment);

module.exports = router;
