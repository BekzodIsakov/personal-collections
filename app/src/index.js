const express = require("express");
const usersRouter = require("./routers/users");
const topicsRouter = require("./routers/topic");
require("./mongoose");

const app = express();

app.use(express.json());
app.use(usersRouter);
app.use(topicsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is live on port " + port);
});
