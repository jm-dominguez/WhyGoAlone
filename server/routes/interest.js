var router = require("express").Router();
var config = require("../../config/database.js");
var Interest = require("../models/Interest");
var User = require("../models/User");
var jwt = require("jsonwebtoken");

router.post("/", function(req, res) {
  var token = req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, config.secret, function(err) {
      if (err) throw err;
      var newInterest = new Interest({
        message: req.body.message,
        venue: req.body.venue,
        person: req.body.person
      });

      newInterest.save(function(err) {
        if (err) throw err;
      });

      User.findById(req.body.person, function(err, user) {
        if (err) throw err;
        user.interests.push(newInterest);
        user.save(function(err) {
          if (err) throw err;

        });
      });

      res.json(newInterest);
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "No token provided"
    });
  }
});

router.get("/user/:userId", function(req, res) {
  var token = req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, config.secret, function(err) {
      if (err) throw err;
      User.findById(req.params.userId.replace(/\s/g, "")).
        populate("interests").
        exec(function(err, user) {
          if (err) throw err;

          res.interests = user.interests;
          res.send(user.interests);
        });
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "No token provided"
    });
  }
});


router.get("/venue/:venueId", function(req, res) {
  var token = req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, config.secret, function(err) {
      if (err) throw err;
      User.find({}).
        populate("interests").
        exec(function(err, users) {
          if (err) throw err;
          let afterFilter = users.filter(function(u) {
            let c = u.interests.filter(function(i) {
              return i.venue === req.params.venueId;
            });
            return c.length > 0;
          });

          res.users = afterFilter;
          res.send(afterFilter);
        });
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "No token provided"
    });
  }
});

module.exports = router;
