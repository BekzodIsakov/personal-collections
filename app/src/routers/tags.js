const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const Tag = require("../models/tagModel");

router.post("/tags/new", checkAuth, async (req, res) => {
  try {
    const tag = new Tag({ ...req.body, authorId: req.user._id });
    await tag.save();
    res.status(201).send(tag);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tags", async (req, res) => {
  try {
    const tags = await Tag.find();
    res.send(tags);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/tags/mine", async (req, res) => {
  try {
    const tags = await Tag.find({ authorId: req.user._id });
    res.send(tags);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/tags/:id", checkAuth, async (req, res) => {
  try {
    const tag = await Tag.findOneAndUpdate(
      { _id: req.params.id, authorId: req.user._id },
      { ...req.body },
      { new: true }
    );
    res.send(tag);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/tags/:id", checkAuth, async (req, res) => {
  try {
    const tag = await Tag.findOneAndDelete({
      _id: req.params.id,
      authorId: req.user._id,
    });
    res.send(tag);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
