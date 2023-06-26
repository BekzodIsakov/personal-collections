const Item = require("../models/itemModel");

const getItems = async (req, res) => {
  try {
    const item = await Item.findOne(
      { _id: req.params.id },
      {
        comments: { $slice: 1 },
      }
    );
    // , {comments: {$slice: [0, 10]}})
    // .populate({
    //   path: "comments",
    //   options: {
    //     limit: 5,
    //   },
    //   populate: {
    //     path: "user",
    //   },
    // });
    if (!item) return res.status(404).send({ message: "Not found!" });
    res.send(item);
  } catch (error) {
    res.status(500).send(error);
  }
};

const addNewComment = async (req, res) => {
  try {
    const comment = {
      comment: req.body.comment,
      user: req.user._id,
      item: req.params.id,
    };
    await Item.findByIdAndUpdate(req.params.id, {
      $push: { comments: comment },
    });
    // await comment.save();
    res.send(comment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateComment = async (req, res) => {};

const getItemComments = async (req, res) => {
  try {
    const comments = await Item.findById(req.params.id).populate("comments");
    res.send(comments);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { getItems, getItemComments, addNewComment };
