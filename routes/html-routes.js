// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/thread/:id", (req, res) => {
    let thread_id = req.params.id
    console.log("searching for thread #" + thread_id)


    res.sendFile(path.join(__dirname, "../public/thread.html"));
  });

  app.get("/club/:google_id", isAuthenticated, (req, res) => {
    let club_id = req.params.google_id
    console.log("searching for club #" + club_id)

    db.Club.findOne({ where: { google_id: club_id } }).then(function (oneClub) {
      var hbsObject = {
        clubs: oneClub
      };
      console.log(hbsObject);
      res.render("index", hbsObject)
    });
  });

  app.get("/thread/:id", (req, res) => {
    let thread_id = req.params.id
    console.log("searching for thread #" + thread_id)



    res.sendFile(path.join(__dirname, "../public/thread.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};
