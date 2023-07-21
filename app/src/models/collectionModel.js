const mongoose = require("mongoose");
const { Item } = require("../models/itemModel");

const collectionSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    index: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  image: {
    originalname: String,
    mimetype: String,
    size: Number,
    location: String,
    key: String,
  },
  itemsLength: {
    type: Number,
    default: 0,
  },
  optionalItemFields: [{ name: "String", type: "String" }],
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

collectionSchema.index({ title: "text" });

collectionSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const collection = this;
    await Item.deleteMany({ _id: { $in: collection.items } });
    next();
  }
);

module.exports = new mongoose.model("Collection", collectionSchema);
