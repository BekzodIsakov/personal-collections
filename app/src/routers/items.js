const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const Item = require("../models/itemModel");
const mongoose = require("mongoose");
const Collection = require("../models/collectionModel");
const items = require("../controllers/items");

router.post("/items/new", checkAuth, async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    await Collection.updateOne(
      { _id: req.body.collectionId },
      { $push: { items: item._id }, $inc: { itemsLength: 1 } }
    );
    // collection.items.push(item._id);
    res.status(201).send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/items/:id", checkAuth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send({ message: "Not found!" });
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/items/:id/react", checkAuth, async (req, res) => {
  try {
    const item = await Item.findOne({
      _id: req.params.id,
    });

    if (item.likes.includes(req.user._id)) {
      item.likes.pull(req.user._id);
    } else {
      item.likes.push(req.user._id);
    }

    await item.save();
    res.send(item);

    // if (item) await Item.findByIdAndUpdate(req.params.id , { $pull: { likes: {user: req.user._id} } });
    // else await Item.findByIdAndUpdate(req.params.id , { $push: { likes: {user: req.user._id} } });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/items/:id", checkAuth, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!item) return res.status(404).send();
    res.send(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/items/:id", checkAuth, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) res.status(404).send({ message: "Not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/items/:id", checkAuth, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) res.status(404).send({ message: "Not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/items/:id/comments", items.getItemComments);

module.exports = router;
