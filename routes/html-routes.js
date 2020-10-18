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

  app.get("/thread/:id", isAuthenticated, (req, res) => {
    let thread_id = req.params.id
    console.log("searching for thread #" + thread_id);

    db.Thread.findOne({ include: db.User, where: { id: thread_id } }).then(function (threadData) {
      db.Response.findAll({ where: { ThreadId: thread_id }, include: db.User }).then(function (responseData) {
        let clearChat = [];

        if (responseData.length != 0) {

          for (let i = 0; i < responseData.length; i++) {
            let nameData = "";
            let ifyoudata = "received_msg";
            let splitCreated = String(responseData[i].dataValues.createdAt).split(" ");
            let splitTime = splitCreated[4].split(":");
            let date = splitCreated[1] + " " + splitCreated[2] + ", " + splitCreated[3]
            let time = ""

            if (parseInt(splitTime[0]) > 12) {
              time = (parseInt(splitTime[0])-12) + ":" + splitTime[1] + " PM"
            }else{
              time = splitTime[0] + ":" + splitTime[1] + " AM"
            }

            if (req.user.id == responseData[i].dataValues.User.dataValues.id) {
              nameData = "You";
              ifyoudata = "outgoing_msg";
            }else{
              nameData = responseData[i].dataValues.User.dataValues.first_name + " " + responseData[i].dataValues.User.dataValues.last_name;
            }

            let tempObj = {
              id: responseData[i].dataValues.id,
              comment: responseData[i].dataValues.comment,
              timeMade: time,
              dateMade: date,
              author: nameData,
              classifyou: ifyoudata
            };

            clearChat.push(tempObj);
          };
        };
        var hbsObject = {
          chat: clearChat,
          thread: threadData
        };
        res.render("chat", hbsObject)
      });
    });

  });

  app.get("/club/:id", isAuthenticated, (req, res) => {
    let club_id = req.params.id
    console.log("searching for club #" + club_id)
    let unspoiled = [];

    db.Association.findOne({ include: db.Club, where: { UserId: req.user.id, ClubId: club_id } }).then(function (clubData) {
      db.Thread.findAll({ where: { ClubId: club_id }, include: db.User }).then(function (threadData) {

        for (let i = 0; i < threadData.length; i++) {
          if (threadData[i].dataValues.pg_num <= clubData.dataValues.current_pg) {
            unspoiled.push(threadData[i]);
          };
        }
        var hbsObject = {
          lessthanthread: unspoiled,
          club: clubData,
          thread: threadData
        };
        res.render("club", hbsObject)
      });
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
    db.Association.findAll({ include: db.Club, where: { UserId: req.user.id, is_fav: true } }).then(function (allClubs) {
      var hbsObject = {
        book: allClubs,
        search: searchArr
      };
      searchArr = defaultArr;
      res.render("homepage", hbsObject);

    });
  });

  app.put("/booksearch", (req, res) => {
    searchArr = req.body.daddy;
    res.end();
  });
};
