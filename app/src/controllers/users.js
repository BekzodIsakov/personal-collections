const signOutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token != req.token);
    req.user.lastSeenAt = new Date();
    console.log({ lastSeenAt: req.user.lastSeenAt });
    await req.user.save();
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  signOutUser,
};
