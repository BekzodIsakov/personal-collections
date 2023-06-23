const express = require("express");
const usersRouter = require("./routers/users");
const topicsRouter = require("./routers/topics");
const collectionsRouter = require("./routers/collections");
const tagsRouter = require("./routers/tags");
const itemsRouter = require("./routers/items");
const commentsRouter = require("./routers/comments");
require("./mongoose");

const app = express();

app.use(express.json());
app.use(usersRouter);
app.use(topicsRouter);
app.use(collectionsRouter);
app.use(tagsRouter);
app.use(itemsRouter);
app.use(commentsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is live on port " + port);
});
