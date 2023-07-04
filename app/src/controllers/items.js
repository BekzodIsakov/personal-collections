const Item = require("../models/itemModel");
const collection = require("../models/collectionModel");
const isUnauthorized = require("../utils/isUnauthorized");

const getItems = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const items = await Item.find()
      .populate("author parentCollection")
      .select({ comments: 0 })
      .sort("-updatedAt")
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    res.send(items);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate("author", "name");

    if (!item) return res.status(400).send({ message: "Not found!" });
    res.send(item);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createNewItem = async (req, res) => {
  try {
    const item = new Item({ ...req.body, author: req.user._id });
    await item.save();
    await collection.updateOne(
      { _id: req.body.parentCollection },
      { $push: { items: item._id }, $inc: { itemsLength: 1 } }
    );
    res.status(201).send(item);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    if (!item) return res.status(404).send({ message: "Not found!" });
    res.send(item);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send({ message: "Not found!" });

    // if (!(req.user.isAdmin || item.author.equals(req.user._id))) {
    //   return res.status(401).send({ message: "Unauthorized request!"});
    // }

    // if (isUnauthorized(req.user, item.author)) {
    //   return res.status(401).send({ message: "Unauthorized request!" });
    // }
    if (isUnauthorized(req.user, item.author, res)) return;

    await item.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const likeUnlikeItem = async (req, res) => {
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
    res.send({ liked: item.liked, likes: item.likes });

    // if (item) await Item.findByIdAndUpdate(req.params.id , { $pull: { likes: {user: req.user._id} } });
    // else await Item.findByIdAndUpdate(req.params.id , { $push: { likes: {user: req.user._id} } });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getItemComments = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  try {
    const comments = await Item.findById(req.params.id)
      .slice("comments", [skip, Number(limit)])
      .exec();

    res.send(comments);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addNewComment = async (req, res) => {
  try {
    const comment = {
      comment: req.body.comment,
      author: req.user._id,
      item: req.params.id,
    };
    await Item.findByIdAndUpdate(req.params.id, {
      $push: { comments: comment },
    });
    res.send(comment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const updateComment = async (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      comment = item.comments.id(req.params.commentId);
      comment.comment = req.body.comment;
      item.save();
    })
    .then(() => res.send({ comment: req.body.comment, status: "success" }))
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

const deleteComment = async (req, res) => {
  try {
    await Item.updateOne(
      { _id: req.params.id, author: req.user._id },
      {
        $pull: {
          comments: { _id: req.params.commentId },
        },
      }
    );

    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getItems,
  getItemById,
  createNewItem,
  updateItem,
  deleteItem,
  likeUnlikeItem,
  getItemComments,
  addNewComment,
  updateComment,
  deleteComment,
};
