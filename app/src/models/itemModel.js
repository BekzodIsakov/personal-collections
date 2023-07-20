const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
  },
  { timestamps: true }
);

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    },
    parentCollection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
    // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    optionalFields: {
      type: [
        { name: "String", type: "String", value: mongoose.Schema.Types.Mixed },
      ],
    },
  },
  { timestamps: true }
);

const Item = new mongoose.model("Item", itemSchema);
const Comment = new mongoose.model("Comment", commentSchema);
module.exports = { Item, Comment };
