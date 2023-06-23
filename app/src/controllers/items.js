const itemModel = require("../models/itemModel");

const getItemComments = async (req, res) => {
  try {
    const comments = await itemModel.findById(req.params.id).populate("comments");
    res.send(comments);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = { getItemComments };
