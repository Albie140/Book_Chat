// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
// const { Where } = require("sequelize/types/lib/utils");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      username: req.user.username,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.post("/api/club", (req, res) => {
    console.log("recieved post request")
    console.log(req.user);
    db.Club.findOne({ where: { google_id: req.body.google_id } })
      .then((found) => {
        console.log("Searched for the book")
        if (!found) {
          console.log("It does not exist")
          db.Club.create({
            google_id: req.body.google_id,
            book_title: req.body.book_title,
            book_author: req.body.book_author,
            pg_count: req.body.pg_count,
            picture_url: req.body.picture_url,
            book_rating: req.body.book_rating,
            book_description: req.body.book_description
          })
            .then((data) => {
              db.Association.create({
                is_fav: true,
                current_pg: 0,
                UserId: req.user.id,
                ClubId: data.id
              })
                .then(() => {
                  res.end();
                })
            })
            .catch(err => {
              res.status(401).json(err);
            });

        } else {
          console.log("It does exist, now searching for an association")
          db.Association.findOne({ where: { UserId: req.user.id, ClubId : found.id } }).then((foundTwo) => {
            if (!foundTwo) {
              console.log("It does not exist")
              db.Association.create({
                is_fav: true,
                current_pg: 0,
                UserId: req.user.id,
                ClubId: found.id
              })
                .then(() => {
                  res.end();
                })
            }else{
              console.log("It does exist, updating");
              console.log(req.user.id);
              console.log(foundTwo.id);

              db.Association.update({ is_fav : true }, {where: { id: foundTwo.id } })
                .then((data) => {
                  console.log(data)
                  res.end();
                })
            };
          })
        }

      });
  });

  app.post("/api/thread", (req, res) => {
    console.log("recieved thread post request")
    console.log(req.user.id)

    db.Thread.create({
      topic: req.body.topic,
      pg_num: req.body.pg_num,
      ClubId: req.body.ClubId,
      UserId: req.user.id
    }).then((data) => {
        console.log(data);
        res.end();
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.post("/api/response", (req, res) => {
    console.log("recieved response post request")
    console.log(req.user)

    db.Response.create({
      comment: req.body.comment,
      ThreadId: req.body.ThreadId,
      UserId: req.user.id
    })
      .then((data) => {
        console.log(data);
        res.end();
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.put("/api/pgnum", (req, res) => {
    console.log("recieved user put request");
    console.log(req.body.pg_num);
    console.log(req.user.id);
    console.log(req.body.club_id);

    db.Association.update({ current_pg: req.body.pg_num }, { where: { UserId: req.user.id, ClubId: req.body.club_id } })
      .then((data) => {
        console.log(data);
        res.end();
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.put("/api/nofav", (req, res) => {
    console.log("i have arrived");

    club_id = req.body.book_id;

    console.log(club_id);

    db.Association.update({ is_fav: false }, { where: { UserId: req.user.id, ClubId: club_id } })
      .then((data) => {
        console.log(data);
        res.end();
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // app.put("/api/fav", (req, res) => {
  //   console.log("recieved user put request");
  //   console.log(req.body.fav);
  //   console.log(req.user.id);
  //   console.log(req.body.club_id);

  //   db.Association.update({is_fav: false}, {where: {UserId : req.user.id, ClubId: req.body.club_id}})
  //     .then((data) => {
  //       console.log(data);
  //       res.end();
  //     })
  //     .catch(err => {
  //       res.status(401).json(err);
  //     });
  // });

  app.get("/api/club", function (req, res) {

    db.Club.findAll().then(function (data) {
      res.json(data);
    });
  });


  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's username and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        id: req.user.id
      });
    }
  });







  // app.delete("/api/club/:id", function (req, res) {
  //   db.Club.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function (data) {
  //       res.json(data);
  //     });
  // });
};
