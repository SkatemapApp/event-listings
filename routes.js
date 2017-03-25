'use strict';

var express = require("express");
var router = express.Router();
var SkatingEvent = require("./models").SkatingEvent;


router.param("id", function(req, res, next, id) {
  SkatingEvent.findById(id, function(err, doc) {
    if (err) return next(err);
    if (!doc) {
      err = new Error("Not found");
      err.status = 404;
      return next(err);
    }
    req.skatingEvent = doc;
    return next();
  });
});


// GET /skatingEvents
router.get("/", function(req, res, next) {
  SkatingEvent.find({})
              .sort({createdAt: -1})
              .exec(function(err, questions) {
                if (err) return next(err);
                res.json(questions);
              });
});

// POST /skatingEvents
router.post("/", function(req, res, next) {
  var skatingEvent = new SkatingEvent(req.body);
  skatingEvent.save(function(err, skatingEvent) {
    if (err) return next(err);
    res.status(201);
    res.json(skatingEvent);
  });
});

// GET /skatingEvents/id
router.get("/:id", function(req, res) {
  res.json(req.skatingEvent);
});

// DELETE /skatingEvents/id
router.delete("/:id", function(req, res) {
  console.log("req.skatingEvent: " + req.skatingEvent);
  req.skatingEvent.remove(function(err) {
    if (err) return next(err);
    res.json({
      response: "DELETE request for ID " + req.params.id
    });
  });
});

module.exports = router;
