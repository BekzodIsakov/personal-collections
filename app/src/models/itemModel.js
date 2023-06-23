const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
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
  // comments: [
  //   {
  //     comment: String,
  //     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  //   },
  // ],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  optionalFields: {
    type: [{ key: "String", value: mongoose.Schema.Types.Mixed }],
  },
});

module.exports = new mongoose.model("Item", ItemSchema);
