'use strict';

var FCM_SERVER_KEY = process.env.FCM_SERVER_KEY || process.exit();
var FCM_SEND_URL = process.env.FCM_SEND_URL || process.exit();

var express = require("express");
var router = express.Router();
var SkatingEvent = require("./models").SkatingEvent;
var parsePost = require("parse-post");
var notificationRequest = require("request");
var translateToModel = require("./model_adapter").translateToModel;

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
router.get("/v1.1/skatingEvents", function(req, res, next) {
  SkatingEvent.find({})
              .sort({createdAt: -1})
              .exec(function(err, questions) {
                if (err) return next(err);
                res.json(questions);
              });
});

// POST /skatingEvents
router.post("/v1.1/skatingEvents", function(req, res, next) {
  var skatingEvent = new SkatingEvent(req.body);
  skatingEvent.save(function(err, skatingEvent) {
    if (err) return next(err);
    res.status(201);
    res.json(skatingEvent);
  });
});

// GET /skatingEvents/id
router.get("/v1.1/skatingEvents/:id", function(req, res) {
  res.json(req.skatingEvent);
});

// DELETE /skatingEvents/id
router.delete("/v1.1/skatingEvents/:id", function(req, res) {
  req.skatingEvent.remove(function(err) {
    if (err) return next(err);
    res.json({
      response: "DELETE request for ID " + req.params.id
    });
  });
});

// HTML form submission
router.post('/v1/submit', parsePost(function(req, res, next) {
  var formData = req.body;
  // http://stackoverflow.com/a/7855281/3104465
  var skatingEvent = translateToModel(formData);

  var currentStatus;
  SkatingEvent.findOne( { 'startAt': skatingEvent.startAt },
                         function(err, doc) {
                           if (doc != null) {
                             currentStatus = doc.status;
                           }
                           sendNotification(currentStatus,
                                           skatingEvent.status);
                           if (err) return next(err);
                         }
  );

  var upsertData = skatingEvent.toObject();
  delete upsertData._id;

  var query = { 'startAt': skatingEvent.startAt };
  SkatingEvent.findOneAndUpdate(query, upsertData, { upsert: true },
                               function(err, skatingEvent) {
                                 if (err) return next(err);
                                 res.status(200);
                                 res.json(skatingEvent);
                               });

}));

function sendNotification(currentStatus, newStatus) {
  var payload = {};
  payload['notification'] = {};
  payload.notification.title = "Skatemap";
  payload.notification.body = "Today's Skate is ";
  payload['to'] = "/topics/all";

  if (currentStatus == null) {
    if (newStatus.code == 4) {
      console.log("none to Rained Off");
      payload.notification.body += newStatus.text;
    } else if (newStatus.code == 2) {
      console.log("none to GO!");
      payload.notification.body += newStatus.text;
    } else {
      console.log("Not sending a notification", currentStatus, newStatus);
      return;
    }
  } else if (currentStatus.code == 2 && newStatus.code == 4) {
    console.log("GO! to Rained Off");
    payload.notification.body += newStatus.text;
  } else if (currentStatus.code == 1 && newStatus.code == 2) {
    console.log("Pending to GO");
    payload.notification.body += newStatus.text;
  } else if (currentStatus.code == 4 && newStatus.code == 2) {
    console.log("Rained off to GO!");
    payload.notification.body += newStatus.text;
  } else {
    console.log("Not sending a notification", currentStatus, newStatus);
    return;
  }
  console.log(payload);
  notificationRequest({
    url: FCM_SEND_URL,
    method: "POST",
    json: true,
    headers: {
        'Authorization': 'key=' + FCM_SERVER_KEY
      },
    body: payload
  }, function(error, response, body) {
    console.log(error);
  })
}

module.exports = router;
