const Comment = require("../models/commentModel");
const Item = require("../models/itemModel");

const addNewComment = async (req, res) => {
  try {
    const comment = new Comment({ ...req.body, user: req.user._id });
    await Item.findByIdAndUpdate(req.body.item, {
      $push: { comments: comment._id },
    });
    await comment.save();
    res.send(comment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const editComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { comment: req.body.comment },
      { new: true }
    );

    if (!comment) return res.status(404).send({ message: "Not found!" });

    await comment.save();
    res.send(comment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) return res.status(404).send({ message: "Not found!" });

    await Item.findByIdAndUpdate(comment.item, {
      $pull: { comments: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { addNewComment, editComment, deleteComment };
