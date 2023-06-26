const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
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

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collection",
    required: true,
  },
  tags: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [commentSchema],
  // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  optionalFields: {
    type: [{ key: "String", value: mongoose.Schema.Types.Mixed }],
  },
});

module.exports = new mongoose.model("Item", itemSchema);
