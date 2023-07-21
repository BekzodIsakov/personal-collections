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
  fakeCollectionModel,
  fakeItemModel,
};
