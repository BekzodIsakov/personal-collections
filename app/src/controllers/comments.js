const Comment = require("../models/commentModel");
const Item = require("../models/itemModel");

// const searchComments = async (req, res) => {
//   const promises = [];
//   try {
//     promises.push(
//       Models.fakeItemModel.find({ $text: { $search: req.body.keyword } })
//     );
//     promises.push(
//       Models.fakeCollectionModel.find({ $text: { $search: req.body.keyword } })
//     );
//     promises.push(
//       Models.commentModel.find({ $text: { $search: req.body.keyword } })
//     );

//     Promise.all(promises)
//       .then((results) => {
//         res.send({
//           items: results[0],
//           collections: results[1],
//           comments: results[2],
//         });
//       })
//       .catch((error) => res.status(500).send({ message: error.message }));
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };

const getComments = async (req, res) => {
  const { page, limit } = req.query;

  try {
    const comments = await Item.findById(req.params.itemId)
      .populate({
        path: "comments",
        options: {
          skip: (page - 1) * limit,
          limit,
        },
        populate: {
          path: "author",
          select: "name",
        },
      })
      .select("comments");

    res.send(comments);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const composeComment = async (comment, parentId) => {
  try {
    const newComment = new Comment(comment);
    await Item.findByIdAndUpdate(parentId, {
      $push: { comments: newComment._id },
    });
    await newComment.save();
    await newComment.populate("author", "name");
    return newComment;
  } catch (error) {
    return error.message;
  }
};

const editComment = async (commentId, content) => {
  try {
    await Comment.findByIdAndUpdate(commentId, { content });
  } catch (error) {
    return error.message;
  }
};

// old
const deleteComment = async (req, res) => {
  try {
    const comment = await Models.commentModel.findByIdAndDelete(req.params.id);

    if (!comment) return res.status(404).send({ message: "Not found!" });

    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  editComment,
  deleteComment,

  getComments,
  composeComment,
  editComment,
};
