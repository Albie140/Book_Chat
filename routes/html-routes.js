// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

const defaultArr = [
  {
    image_url: 'http://books.google.com/books/content?id=lzzYDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    book_title: 'The Searcher',
    book_author: 'Tana French',
    selflink: 'https://www.googleapis.com/books/v1/volumes/lzzYDwAAQBAJ'
  },
  {
    image_url: 'http://books.google.com/books/content?id=UyTIDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    book_title: 'Leave the World Behind',
    book_author: 'Rumaan Alam',
    selflink: 'https://www.googleapis.com/books/v1/volumes/UyTIDwAAQBAJ'
  },
  {
    image_url: 'http://books.google.com/books/content?id=vH3LDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    book_title: 'The Invisible Life of Addie LaRue',
    book_author: 'V. E. Schwab',
    selflink: 'https://www.googleapis.com/books/v1/volumes/vH3LDwAAQBAJ'
  },
  {
    image_url: 'http://books.google.com/books/content?id=zr5NBldVA5UC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    book_title: 'And Then There Were None',
    book_author: 'Agatha Christie',
    selflink: 'https://www.googleapis.com/books/v1/volumes/zr5NBldVA5UC'
  },
  {
    image_url: 'http://books.google.com/books/content?id=ibvbDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    book_title: 'The Good Earth',
    book_author: 'Pearl S. Buck',
    selflink: 'https://www.googleapis.com/books/v1/volumes/ibvbDwAAQBAJ'
  },
  {
    image_url: 'http://books.google.com/books/content?id=jVB1DwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
    book_title: 'Where the Crawdads Sing',
    book_author: 'Delia Owens',
    selflink: 'https://www.googleapis.com/books/v1/volumes/jVB1DwAAQBAJ'
  }
];
var searchArr = defaultArr;

module.exports = function (app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("homepage", {
        msg: "Welcome!"
      });
    }
    res.render("login", {
        msg: "Welcome!"
      });
  });

  app.get("/signup", (req, res) => {
      res.render("signup", {
        msg: "Welcome!"
      });
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect('/homepage')
    }
    res.render("login", {
        msg: "Welcome!"
      });
  });

  app.get("/thread/:id", (req, res) => {
    let thread_id = req.params.id
    console.log("searching for thread #" + thread_id);

    db.Thread.findOne({ where: { id: thread_id } }).then(function (oneThread) {
      var hbsObject = {
        thread: oneThread
      };
      console.log(hbsObject);
      res.render("chat", hbsObject)
    });

  });

  app.get("/club/:id", isAuthenticated, (req, res) => {
    let club_id = req.params.id
    console.log("searching for club #" + club_id)

    db.Club.findOne({ where: { id: club_id } }).then(function (oneClub) {
      var hbsObject = {
        club: oneClub
      };
      console.log(hbsObject);
      res.render("club", hbsObject)
    });
  });

  app.get("/thread/:id", (req, res) => {
    let thread_id = req.params.id
    console.log("searching for thread #" + thread_id)



    res.sendFile(path.join(__dirname, "../public/thread.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/homepage", isAuthenticated, (req, res) => {
    db.Club.findAll({}).then(function (allClubs) {
      var hbsObject = {
        book: allClubs,
        search: searchArr
      };
      res.render("homepage", hbsObject);
      searchArr = defaultArr;
    });
  });

  app.put("/booksearch", (req, res) => {
    searchArr = req.body.daddy;
    res.end();
  });
};
