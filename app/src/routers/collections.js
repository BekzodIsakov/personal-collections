const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const Collection = require("../models/collectionModel");
const mongoose = require("mongoose");
const { uploadImage, deleteImage } = require("../middlewares/uploadImage");

const multer = require("multer");
const upload = multer({
  fileFilter: function (req, file, cb) {
    if (file) {
      console.log("there is file");
      uploadImage.single("image");
    }
    cb(null, true);
  },
});

router.post(
  "/collections/new",
  checkAuth,
  uploadImage.single("image"),
  async (req, res) => {
    console.log({ file: req.file });
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
  }
);

// UPDATE
router.patch(
  "/collections/:id",
  checkAuth,
  uploadImage.single("image"),
  async (req, res) => {
    try {
      // console.log({ file: req.file });
      // console.log({ body: req.body });
      // res.send(req.file?.originalname);
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
        collection.image && deleteImage(collection.image.key);
      }

      const collection = await Collection.findByIdAndUpdate(
        req.params.id,
        update,
        { new: true }
      )
        .populate("items")
        .exec();
      if (!collection) return res.status(404).send({ message: "Not found!" });
      res.send(collection);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

router.get("/collections", checkAuth, async (req, res) => {
  try {
    const collections = await Collection.find({ author: req.user._id })
      .populate("items")
      .exec();
    res.send(collections);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/collections/top5", checkAuth, async (req, res) => {
  try {
    const collections = await Collection.find({}, null, {
      sort: { itemsLength: -1 },
      limit: 5,
    });
    res.send(collections);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/collections/:id", checkAuth, async (req, res) => {
  try {
    const collection = await Collection.findOne({
      _id: req.params.id,
      author: req.user._id,
    });
    if (!collection) return res.status(404).send("Not found!");

    const dataType = collection.image.file.contentType;
    const base64data = collection.image.file.data.toString("base64");
    const collectionObject = collection.toObject();
    delete collectionObject.image.file.data;
    collectionObject.image.src = `data:${dataType};base64,${base64data}`;

    await collection.populate("items");
    collectionObject.items = collection.items;
    res.send(collectionObject);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/collections/:id");
router.delete("/collections");

module.exports = router;
