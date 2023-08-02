const { Item, Comment } = require("../models/itemModel");
const Collection = require("../models/collectionModel");
const collection = require("../models/collectionModel");
const isUnauthorized = require("../utils/isUnauthorized");

const searchItems = async (req, res) => {
  const promises = [];
  try {
    promises.push(
      Item.find({ $text: { $search: req.query.text } }).select("_id name")
    );
    promises.push(
      Collection.find({ $text: { $search: req.query.text } }).slice(
        "items",
        [0, 1]
      )
    );

    Promise.all(promises)
      .then((results) => {
        res.send({
          items: results[0],
          collections: results[1],
        });
      })
      .catch((error) => res.status(500).send({ message: error.message }));
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getItems = async (req, res) => {
  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split("_");
    sort[parts[0]] = parts[1];
  }
  try {
    const { page, limit, findBy } = req.query;

    let parts = [];
    const query = {};

    if (findBy) {
      parts = findBy.split("_");
    }

    const allowedFields = ["name", "author", "tags"];

    if (allowedFields.includes(parts[0])) {
      query[parts[0]] = parts[1];
    }

    const items = await Item.find(query)
      .populate("author parentCollection", "-items")
      .select({ comments: 0 })
      .sort(sort)
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
    const item = await Item.findById(req.params.id)
      .populate({
        path: "author",
        select: "name",
      })
      .populate({ path: "comments.author", select: "name" });

    if (!item) return res.status(400).send({ message: "Not found!" });
    res.send(item);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createNewItem = async (req, res) => {
  try {
    const item = new Item({ ...req.body });
    await item.save();
    await collection.updateOne(
      { _id: req.body.parentCollection },
      { $push: { items: item._id }, $inc: { itemsLength: 1 } }
    );
    await item.populate("tags");
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
    )
      .populate("tags")
      .populate({
        path: "author",
        select: "name",
      })
      .populate({ path: "comments.author", select: "name" });

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
    res.send(item.likes);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getItemComments = async (req, res) => {
  try {
    const comments = await Item.findById(req.params.id)
      .populate({
        path: "comments.author",
        select: "name",
      })
      .select("comments");

    res.send(comments);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addNewComment = async (req, res) => {
  try {
    const comment = new Comment({
      comment: req.body.comment,
      author: req.user._id,
      item: req.params.id,
    });
    await Item.findByIdAndUpdate(req.params.id, {
      $push: { comments: comment },
    });
    await comment.populate("author");
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
  searchItems,
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
