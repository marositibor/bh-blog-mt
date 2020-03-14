const users = [
  {
    username: "admin",
    password: "admin"
  }
];
module.exports = class loginService {
  getAuthenticatedUser(username, password) {
    return users.find(
      user => user.username === username && user.password === password
    );
  }
};
