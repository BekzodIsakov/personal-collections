const users = [];

function getUser(id) {
  return users.find((user) => user.id === id);
}

function addUser({ id, userId, roomId }) {
  const user = { id, userId, roomId };
  users.push(user);
  return user;
}

function removeUser(id) {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex > -1) {
    return users.splice(userIndex, 1)[0];
  }
}

module.exports = {
  users,
  getUser,
  addUser,
  removeUser,
};
