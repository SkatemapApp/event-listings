'use strict';

var express = require("express");
var router = express.Router();
var SkatingEvent = require("./models").SkatingEvent;
var parsePost = require("parse-post");

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
router.get("/skatingEvents", function(req, res, next) {
  SkatingEvent.find({})
              .sort({createdAt: -1})
              .exec(function(err, questions) {
                if (err) return next(err);
                res.json(questions);
              });
});

// POST /skatingEvents
router.post("/skatingEvents", function(req, res, next) {
  var skatingEvent = new SkatingEvent(req.body);
  skatingEvent.save(function(err, skatingEvent) {
    if (err) return next(err);
    res.status(201);
    res.json(skatingEvent);
  });
});

// GET /skatingEvents/id
router.get("/skatingEvents/:id", function(req, res) {
  res.json(req.skatingEvent);
});

// DELETE /skatingEvents/id
router.delete("/skatingEvents/:id", function(req, res) {
  req.skatingEvent.remove(function(err) {
    if (err) return next(err);
    res.json({
      response: "DELETE request for ID " + req.params.id
    });
  });
});

// HTML form submission
router.post('/submit', parsePost(function(req, res, next) {
  var formData = req.body;
  // http://stackoverflow.com/a/7855281/3104465
  var skatingEvent = translate(formData);
  var upsertData = skatingEvent.toObject();
  delete upsertData._id;

  var query = { 'startAt': skatingEvent.startAt };
  SkatingEvent.findOneAndUpdate(query, upsertData, { upsert: true },
                               function(err, skatingEvent) {
                                 if (err) return next(err);
                                 res.status(200);
                                 res.json(skatingEvent);
                               })
                             }));

function translate(formData) {
  var skatingEvent = new SkatingEvent(
    {
			"title": formData.name,
			"description": formData.description,
      "startAt": formData.start,
      "meetingPoint": {
        "name": formData.meet,
        "coordinates": {
          "latitude": formData.meet_lat,
          "longitude": formData.meet_lon
        }
      },
      "halfTime": {
        "name": formData.halftime,
        "coordinates": {
          "latitude": formData.halftime_lat,
          "longitude": formData.halftime_lon
        }
      },
      "distance": formData.distance,
      "leadMarshal": formData.marshal,
      "status": {
        "code": formData.status_code,
        "text": formData.status
      },
      "url": formData.url,
      "route": {
        "url": formData.url_route
      }
    }
  );
  return skatingEvent;
}



module.exports = router;
