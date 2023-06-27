module.exports = (user, author, res) => {
  if (!(user.isAdmin || author.equals(user._id))) {
    res.status(401).send({ message: "Unauthorized request!" });
    return true;
  }
};
