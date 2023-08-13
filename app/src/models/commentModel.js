const mongoose = require("mongoose");
const User = require("./userModel");

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
      default: Array,
    },
    replies: { type: [this], default: Array },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Comment", commentSchema);
