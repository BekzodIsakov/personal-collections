const express = require("express");
const User = require("../models/userModel");
const checkAuth = require("../middlewares/checkAuth");
const checkIsAdmin = require("../middlewares/checkIsAdmin");
const router = express.Router();
const users = require("../controllers/users");

router.post("/users/signup", async (req, res) => {
  console.log({ body: req.body });
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    if (error.keyValue) {
      const key = Object.keys(error.keyValue);
      if (key) {
        return res.status(400).send({
          message: `${error.keyValue[key]} already exists. Please choose different ${key}.`,
        });
      }
    }
    res.status(400).send({ message: error.message });
  }
});

router.post("/users/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);

    if (user.isBlocked)
      return res.status(403).send({ message: "User is blocked!" });
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/users/me", checkAuth, (req, res) => {
  res.send(req.user);
});

router.get("/users/:id", checkAuth, users.fetchUser);

router.patch("/users/me", checkAuth, checkIsAdmin, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/users/me", checkAuth, checkIsAdmin, async (req, res) => {
  try {
    await req.user.deleteOne();
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/signout", checkAuth, users.signOutUser);
// router.post("/users/signout", checkAuth, async (req, res) => {
//   try {
//     req.user.tokens = req.user.tokens.filter((token) => token != req.token);
//     req.user.lastSeenAt = new Date();
//     console.log({ lastSeenAt: req.user.lastSeenAt });
//     await req.user.save();
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

router.get("/users", checkAuth, checkIsAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.patch("/users/:id", checkAuth, checkIsAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/users/:id", checkAuth, checkIsAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    es.status(500).send(error);
  }
});

module.exports = router;
