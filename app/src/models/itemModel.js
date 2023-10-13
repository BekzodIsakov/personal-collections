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

itemSchema.index({ name: "text" });
// commentSchema.index({ comment: "text" });

// itemSchema.pre(
//   "deleteOne",
//   { document: true, query: false },
//   async function () {
//     const currentItem = this;
//     // await Collection.findByIdAndUpdate("65279018f9a55745082c5832", {
//     //   itemsLength: { $inc: -1 },
//     // });

//     const collection = await Collection.findById("65279018f9a55745082c5832");
//   }
// );

const Item = new mongoose.model("Item", itemSchema);
module.exports = Item;
