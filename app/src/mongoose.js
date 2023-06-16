const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(
    `mongodb+srv://yusuftempr:${encodeURIComponent(
      process.env.ATLAS_CONNECTION_PASSWORD
    )}@cluster0.6gwpdbl.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connection success!");
  })
  .catch((err) => {
    console.log("Database connection failed!");
    console.log(err);
  });
