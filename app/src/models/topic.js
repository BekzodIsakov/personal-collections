const mongoose = require("mongoose");
const TopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const Topic = new mongoose.model("Topic", TopicSchema);
module.exports = Topic;
