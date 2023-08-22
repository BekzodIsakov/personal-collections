const mongoose = require("mongoose");
const User = require("./userModel");
// const CommentReply = require("./commentReplyModel");

const replySchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

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
    replies: [replySchema],
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Comment", commentSchema);
