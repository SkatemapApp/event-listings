"use strict";

const toUtcString = require("../utils").toUtc;

function translate(skatingEvent) {
  var apiModel = {};
  var key = skatingEvent._id;
  apiModel[key] = ({name: skatingEvent.title,
                    description: skatingEvent.description,
                    start: toUtcString(skatingEvent.startAt),
                    meet: skatingEvent.meetingPoint['name'],
                    meet_latlon: [skatingEvent.meetingPoint['coordinates'].latitude,
                    skatingEvent.meetingPoint['coordinates'].longitude],
                    halftime: skatingEvent.halfTime['name'],
                    halftime_latlon: [skatingEvent.halfTime['coordinates'].latitude,
                    skatingEvent.halfTime['coordinates'].longitude],
                    distance: skatingEvent.distance,
                    marshal: skatingEvent.leadMarshal,
                    status: skatingEvent.status['text'],
                    status_code: skatingEvent.status['code'],
                    url: skatingEvent.url,
                    added: toUtcString(skatingEvent.createdAt),
                    last_modified: toUtcString(skatingEvent.updatedAt),
                    last_modified_route: toUtcString(skatingEvent.route['updatedAt']),
                    route: []
                    });
  return apiModel;
}

module.exports.translateToApiV1 = translate
