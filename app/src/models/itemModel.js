const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
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
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    optionalFields: {
      type: [
        {
          name: "String",
          type: "String",
          value: mongoose.Schema.Types.Mixed,
        },
      ],
    },
  },
  { timestamps: true }
);

// itemSchema.index({ name: "text" });
// commentSchema.index({ comment: "text" });

const Item = new mongoose.model("Item", itemSchema);
module.exports = Item;
