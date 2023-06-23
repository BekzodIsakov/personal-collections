const mongoose = require("mongoose");
const CollectionSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
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
  // image: Buffer,
  image: {
    // file: {
    //   data: Buffer,
    //   contentType: String,
    // },
    // fileName: String,
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
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

// CollectionSchema.virtual("items", {
//   ref: "Item",
//   localField: "_id",
//   foreignField: "parentCollection",
// });

const Collection = new mongoose.model("Collection", CollectionSchema);
module.exports = Collection;
