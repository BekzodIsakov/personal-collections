const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const { uploadImage } = require("../middlewares/uploadImage");

const collections = require("../controllers/collection");

router.get("/collections", checkAuth, collections.getCollections);

router.get("/collections/topFive", collections.getTopFiveCollections);

router.get("/collections/:id", collections.getCollectionById);

router.get("/collections/:id/items", checkAuth, collections.getCollectionItems);

router.post(
  "/collections/new",
  checkAuth,
  uploadImage.single("image"),
  collections.createNewCollection
);

router.patch(
  "/collections/:id",
  checkAuth,
  uploadImage.single("image"),
  collections.updateCollection
);

router.delete("/collections/:id", checkAuth, collections.deleteCollection);

router.delete(
  "/collections/:id/image",
  checkAuth,
  collections.deleteCollectionImage
);

module.exports = router;
