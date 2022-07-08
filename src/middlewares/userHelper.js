const activeUsers = [];
// user is online
function newUser() {
  const user = { id, username };
  activeUsers.push(user);

  return user;
}

//get active user
function getActiveUser(id) {
  return activeUsers.find((user) => user.id === id);
}

//get offline user
function goOffline(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return activeUsers.splice(index, 1)[0];
  }
}

//get all active users
function allActiveUsers() {
  return activeUsers;
}

module.exports = {
  newUser,
  getActiveUser,
  goOffline,
  allActiveUsers,
};
