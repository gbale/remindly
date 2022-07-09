let database = require("../database");

let authController = {
  login: (req, res) => {
    res.render("auth/login", { isLogin: true });
  },

  logout: (req, res) => {
    req.logout();
    res.redirect("/");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement
  },

  registerSubmit: (req, res) => {
    // implement
  },
};

module.exports = authController;
