const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Tag = new mongoose.model("Tag", TagSchema);
module.exports = Tag;
