var db = require("../models");
var path = require("path");

module.exports = function (app) {

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));

  });

  app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));

  });

  app.get("/profile", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));

  });

  app.get("/manager", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/manager.html"));

  });


  app.post("/auth", function (req, res) {
    console.log(req.body);

  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
