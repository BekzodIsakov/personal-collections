const Models = require("../models/commentModel");

const searchComments = async (req, res) => {
  const promises = [];
  try {
    promises.push(
      Models.fakeItemModel.find({ $text: { $search: req.body.keyword } })
    );
    promises.push(
      Models.fakeCollectionModel.find({ $text: { $search: req.body.keyword } })
    );
    promises.push(
      Models.commentModel.find({ $text: { $search: req.body.keyword } })
    );
    // const searchResults = await Models.commentModel.find({
    //   $text: { $search: req.body.keyword },
    // });
    Promise.all(promises)
      .then((results) => {
        res.send({
          items: results[0],
          collections: results[1],
          comments: results[2],
        });
      })
      .catch((error) => res.status(500).send({ message: error.message }));
    // res.send(searchResults);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Models.commentModel.find();

    // await Item.findByIdAndUpdate(req.body.item, {
    //   $push: { comments: comment },
    // });
    res.send(comments);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addNewComment = async (req, res) => {
  try {
    const comment = {
      name: req.body.name,
      comment: req.body.comment,
      user: req.user._id,
    };
    const commentDoc = new Models.commentModel(comment);
    // await Item.findByIdAndUpdate(req.body.item, {
    //   $push: { comments: comment },
    // });
    await commentDoc.save();
    res.send(comment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const editComment = async (req, res) => {
  try {
    const comment = await Models.commentModel.findByIdAndUpdate(
      req.params.id,
      { comment: req.body.comment },
      { new: true }
    );

    if (!comment) return res.status(404).send({ message: "Not found!" });

    await comment.save();
    res.send(comment);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Models.commentModel.findByIdAndDelete(req.params.id);

    if (!comment) return res.status(404).send({ message: "Not found!" });

    // await Item.findByIdAndUpdate(comment.item, {
    //   $pull: { comments: req.params.id },
    // });
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// FAKE
const getFakeCollections = async (req, res) => {
  try {
    const fakeCollections = await Models.fakeCollectionModel.find();

    res.send(fakeCollections);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addNewFakeCollection = async (req, res) => {
  try {
    const fakeCollection = new Models.fakeCollectionModel({
      name: req.body.name,
    });

    await fakeCollection.save();
    res.send(fakeCollection);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getFakeItems = async (req, res) => {
  try {
    const items = await Models.fakeItemModel.find();

    res.send(items);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addNewFakeItem = async (req, res) => {
  try {
    const item = new Models.fakeItemModel({ name: req.body.name });

    await item.save();
    res.send(item);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getComments,
  searchComments,
  addNewComment,
  editComment,
  deleteComment,
  getFakeCollections,
  addNewFakeCollection,
  getFakeItems,
  addNewFakeItem,
};
