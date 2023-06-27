const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const Item = require("../models/itemModel");
const mongoose = require("mongoose");
const Collection = require("../models/collectionModel");
const items = require("../controllers/items");
const checkAuthorization = require("../utils/isUnauthorized");

router.get("/items", items.getItems);

router.get("/items/:id", checkAuth, items.getItemById);

router.post("/items/new", checkAuth, items.createNewItem);
// router.post("/items/new", checkAuth, async (req, res) => {
//   try {
//     const item = new Item(req.body);
//     await item.save();
//     await Collection.updateOne(
//       { _id: req.body.collectionId },
//       { $push: { items: item._id }, $inc: { itemsLength: 1 } }
//     );
//     // collection.items.push(item._id);
//     res.status(201).send(item);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

router.patch("/items/:id", checkAuth, items.updateItem);
// router.patch("/items/:id", checkAuth, async (req, res) => {
//   try {
//     const item = await Item.findByIdAndUpdate(
//       req.params.id,
//       { ...req.body },
//       { new: true }
//     );

//     if (!item) return res.status(404).send({message: "Not found!"});
//     res.send(item);
//   } catch (error) {
//     res.status(500).send({message: error.message});
//   }
// });

router.delete("/items/:id", checkAuth, items.deleteItem);
// router.delete("/items/:id", checkAuth, async (req, res) => {
//   try {
//     const item = await Item.findByIdAndDelete(req.params.id);
//     if (!item) res.status(404).send({ message: "Not found" });
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

router.patch("/items/:id/react", checkAuth, items.likeUnlikeItem);

router.get("/items/:id/comments", items.getItemComments);
// router.get("/items/:id/comments", async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;
//   const skip = (page - 1) * limit;
//   try {
//     const comments = await Item.findById(req.params.id)
//       // .select("comments")
//       // .skip((page - 1) * limit)
//       // .limit(limit)
//       // .exec();
//       .slice("comments", [skip, Number(limit)])
//       .exec();

//     res.send(comments);
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

router.post("/items/:id/comments/new", checkAuth, items.addNewComment);

router.patch("/items/:id/comments/:commentId", checkAuth, items.updateComment);

router.delete("/items/:id/comments/:commentId", checkAuth, items.deleteComment);

// router.patch("/items/:id/react", checkAuth, async (req, res) => {
//   try {
//     const item = await Item.findOne({
//       _id: req.params.id,
//     });

//     if (item.likes.includes(req.user._id)) {
//       item.likes.pull(req.user._id);
//     } else {
//       item.likes.push(req.user._id);
//     }

//     await item.save();
//     res.send(item);

//     // if (item) await Item.findByIdAndUpdate(req.params.id , { $pull: { likes: {user: req.user._id} } });
//     // else await Item.findByIdAndUpdate(req.params.id , { $push: { likes: {user: req.user._id} } });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

module.exports = router;
