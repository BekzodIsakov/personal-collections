const express = require("express");
const cors = require("cors");
const usersRouter = require("./routers/users");
const topicsRouter = require("./routers/topics");
const collectionsRouter = require("./routers/collections");
const tagsRouter = require("./routers/tags");
const itemsRouter = require("./routers/items");
const commentsRouter = require("./routers/comments");
require("./mongoose");

const {
  composeComment,
  editComment,
  deleteComment,
} = require("./controllers/comments");

const { users, getUser, addUser, removeUser } = require("./utils/users");

const { Server } = require("socket.io");
const http = require("http");

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("NEW CONNECTION");

  socket.on("join", ({ userId, roomId }) => {
    addUser({ id: socket.id, userId, roomId });
    socket.join(roomId);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });

  socket.on("comment", async (comment, callback) => {
    callback();
    const { userId, roomId } = getUser(socket.id);
    const newComment = await composeComment(
      {
        author: userId,
        content: comment,
      },
      roomId
    );
    io.to(roomId).emit("comment", newComment);
  });

  socket.on("editComment", async ({ commentId, content }, callback) => {
    const { roomId } = getUser(socket.id);

    await editComment(commentId, content);
    callback();
    io.to(roomId).emit("editComment", { commentId, content });
  });

  socket.on("deleteComment", async (commentId, callback) => {
    await deleteComment(commentId);
    callback();
  });
});

app.use(cors());
app.use(express.json());
app.use(usersRouter);
app.use(topicsRouter);
app.use(collectionsRouter);
app.use(tagsRouter);
app.use(itemsRouter);
app.use(commentsRouter);

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log("Server is live on port " + port);
});
