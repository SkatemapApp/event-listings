var SkatingEvent = require("../models").SkatingEvent;

function translateToModel(formData) {
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

module.exports.translateToModel = translateToModel;
