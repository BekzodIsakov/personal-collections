const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const Topic = require("../models/topic");

router.post("/topics/new", checkAuth, async (req, res) => {
  const topic = new Topic(req.body);
  try {
    await topic.save();
    res.redirect("/topics");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/topics", async (req, res) => {
  try {
    const topics = await Topic.find({});
    res.send(topics);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/topics/:id", checkAuth, async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
      },
      { new: true }
    );
    if (!topic) return res.status(404).send({ message: "Topic not found!" });
    res.send(topic);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/topics/:id", checkAuth, async (req, res) => {
  try {
    await Topic.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
