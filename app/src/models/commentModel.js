const mongoose = require("mongoose");

const fakeCollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
});

const fakeCollectionModel = new mongoose.model(
  "fakeCollection",
  fakeCollectionSchema
);
fakeCollectionSchema.index({ name: "text" });

const fakeItemSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
});

const fakeItemModel = new mongoose.model("fakeItem", fakeItemSchema);
fakeItemSchema.index({ name: "text" });

module.exports = {
  // commentModel,
  fakeCollectionModel,
  fakeItemModel,
};

// const commentSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       index: true,
//     },
//     comment: {
//       type: String,
//       required: true,
//       trim: true,
//       index: true,
//     },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     // item: {
//     //   type: mongoose.Schema.Types.ObjectId,
//     //   ref: "Item",
//     //   required: true,
//     // },
//   },
//   { timestamps: true }
// );

// commentSchema.index({ name: "text", comment: "text" });

// const commentModel = new mongoose.model("Comment", commentSchema);
