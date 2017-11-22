'use strict';

var FCM_SERVER_KEY = process.env.FCM_SERVER_KEY;
var FCM_SEND_URL = process.env.FCM_SEND_URL;
var SKATING_EVENTS_URL = process.env.SKATING_EVENTS_URL;

var express = require("express");
var router = express.Router();
var SkatingEvent = require("./models").SkatingEvent;
var parsePost = require("parse-post");
var notificationRequest = require("request");

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

router.get("/", function(req, res, next) {
    res.status(200);
    res.json({skating_events: SKATING_EVENTS_URL});
  }
);


router.get("/ping", function(req, res, next) {
  res.status(200);
  res.json({});
});


// GET /skating-events
router.get("/skating-events", function(req, res, next) {
  SkatingEvent.find({})
              .sort({createdAt: -1})
              .exec(function(err, questions) {
                if (err) return next(err);
                var v1Obj = toApiV1(questions);
                console.log(questions);
                res.json(v1Obj);
              });
});

// POST /skating-events
router.post("/skating-events", function(req, res, next) {
  var skatingEvent = new SkatingEvent(req.body);
  skatingEvent.save(function(err, skatingEvent) {
    if (err) return next(err);
    res.status(201);
    res.json(skatingEvent);
  });
});

// GET /skating-events/id
router.get("/skating-events/:id", function(req, res) {
  res.json(req.skatingEvent);
});

// DELETE /skating-events/id
router.delete("/skating-events/:id", function(req, res) {
  req.skatingEvent.remove(function(err) {
    if (err) return next(err);
    res.json({
      response: "DELETE request for ID " + req.params.id
    });
  });
});

// HTML form submission
router.post('/skating-events/submit', parsePost(function(req, res, next) {
  var formData = req.body;
  // http://stackoverflow.com/a/7855281/3104465
  var skatingEvent = translate(formData);

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

function toApiV1(skatingEvents) {
  var skates = extractSkatingEvents(skatingEvents)
  return { version: 1,
            retrieved: "2017-11-21 22:59:30",
            skates
          }
}

function extractSkatingEvents(skatingEvents) {
  var hashTable = {};
  for (var i = 0; i < skatingEvents.length; i++) {
      var key = skatingEvents[i]._id;
      hashTable[key] = ({name: skatingEvents[i].title,
                         description: skatingEvents[i].description,
                         start: skatingEvents[i].startAt,
                         meet: skatingEvents[i].meetingPoint['name'],
                         meet_latlon: [skatingEvents[i].meetingPoint['coordinates'].latitude,
                          skatingEvents[i].meetingPoint['coordinates'].longitude],
                         halftime: skatingEvents[i].halfTime['name'],
                         halftime_latlon: [skatingEvents[i].halfTime['coordinates'].latitude,
                          skatingEvents[i].halfTime['coordinates'].longitude],
                         distance: skatingEvents[i].distance,
                         marshal: skatingEvents[i].leadMarshal,
                         status: skatingEvents[i].status['text'],
                         status_code: skatingEvents[i].status['code'],
                         url: skatingEvents[i].url,
                         added: skatingEvents[i].createdAt,
                         last_modified: skatingEvents[i].updatedAt,
                         last_modified_route: skatingEvents[i].route['updatedAt'],
                         route: skatingEvents[i].route['segments']
                        });
  }
  return hashTable;
}

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
