const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Collection = require("./collectionModel");
const { Item } = require("./itemModel");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: function (value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    lastSeenAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ id: user._id.toString() }, "SecretKey");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  const ERROR_MSG = "Incorrect password or email";

  if (!user) {
    throw new Error(ERROR_MSG);
  }

  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  if (hashedPassword === user.password) {
    return user;
  }
  throw new Error(ERROR_MSG);
};

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const hash = crypto
      .createHash("sha256")
      .update(user["password"])
      .digest("hex");
    user["password"] = hash;
  }

  next();
});

UserSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await Collection.deleteMany({ author: this._id });
    await Item.deleteMany({ author: this._id });
    next();
  }
);

const User = new mongoose.model("User", UserSchema);
module.exports = User;
