const Collection = require("../models/collectionModel");
const { deleteImage } = require("../middlewares/uploadImage");

const getCollections = async (req, res) => {
  const query = {};
  if (req.query.getBy) {
    const parts = req.query.getBy.split("_");
    query[parts[0]] = parts[1];
  }

  try {
    const collections = await Collection.find(query).populate("author");
    res.send(collections);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTopFiveCollections = async (req, res) => {
  try {
    let collections = await Collection.aggregate()
      .addFields({
        arrLength: {
          $size: "$items",
        },
      })
      .sort({ arrLength: -1 });

    res.send(collections);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findOne({
      _id: req.params.id,
    }).populate("author items topic");

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
    })
      .populate("author topic")
      .populate({
        path: "items",
        options: { skip: (page - 1) * limit, limit },
        populate: {
          path: "tags",
        },
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

      const collection = await Collection.findById(req.params.id).populate(
        "author items topic"
      );
      if (collection.image?.key) deleteImage(collection.image.key);
    }

    const collection = await Collection.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    ).populate("author items topic");
    if (!collection) return res.status(404).send({ message: "Not found!" });
    res.send(collection);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteCollection = async (req, res) => {
  const collection = await Collection.findOne({ _id: req.params.id });
  collection.deleteOne();

  res.status(204).send();
};

const deleteCollectionImage = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id).populate(
      "author items topic"
    );

    if (!collection)
      return res.status(404).send({ message: "Collection not found!" });

    if (collection.image?.key) deleteImage(collection.image.key);
    collection.image = undefined;

    await collection.save();
    res.send(collection);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getCollections,
  getTopFiveCollections,
  getCollectionById,
  getCollectionItems,
  createNewCollection,
  updateCollection,
  deleteCollection,
  deleteCollectionImage,
};
