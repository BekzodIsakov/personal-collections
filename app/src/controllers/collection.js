const Collection = require("../models/collectionModel");

const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ author: req.user._id });
    // .populate("items")
    // .exec();
    res.send(collections);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTopFiveCollections = async (req, res) => {
  try {
    const collections = await Collection.find({}, null, {
      sort: { itemsLength: -1 },
      limit: 5,
    });
    res.send(collections);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findOne({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!collection) return res.status(404).send({ message: "Not found!" });
    res.send(collection);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getCollectionItems = async (req, res) => {
  const { page, limit } = req.query;

  try {
    const collection = await Collection.findOne({
      _id: req.params.id,
      author: req.user._id,
    }).populate({
      path: "items",
      options: { skip: (page - 1) * limit, limit },
    });

    if (!collection) return res.status(404).send({ message: "Not found!" });
    res.send(collection);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createNewCollection = async (req, res) => {
  const { originalname, mimetype, size, location, key } = req.file || {};

  try {
    const collection = new Collection({
      ...req.body,
      author: req.user._id,
      image: {
        originalname,
        mimetype,
        size,
        location,
        key,
      },
    });

    await collection.save();
    res.status(201).send(collection);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCollection = async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file) {
      const { originalname, mimetype, size, location, key } = req.file;

      update.image = {
        originalname,
        mimetype,
        size,
        location,
        key,
      };

      const collection = await Collection.findById(req.params.id);
      if (collection.image?.key) deleteImage(collection.image.key);
    }

    const collection = await Collection.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    // .populate("items")
    // .exec();
    if (!collection) return res.status(404).send({ message: "Not found!" });
    res.send(collection);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteCollection = async (req, res) => {
  const collection = await Collection.findOne({ _id: req.params.id });
  collection.deleteOne();
  // await collection.remove();

  res.status(204).send();
};

module.exports = {
  getCollections,
  getTopFiveCollections,
  getCollectionById,
  getCollectionItems,
  createNewCollection,
  updateCollection,
  deleteCollection,
};
