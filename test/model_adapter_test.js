"use strict";

const expect = require('chai').expect;

describe('Translate form data', function() {
  const translateToModel = require('../adapters/model_adapter').translateToModel;

  it('should correctly translate the incoming form data', function() {
   const formData = {
      name: "Sunday Stroll: Wandering southwards",
      description: "A little jaunt down to wandsworth and then back southbound by the river",
      start: "2017-10-15 13:00:00 UTC",
      meet: "East end of Serpentine Road",
      distance: 10,
      status: "Pending",
      meet_lat: 51.504322,
      meet_lon: -0.153358,
      halftime: "wandsworth road",
      halftime_lat: 51.46823498207083,
      halftime_lon: -0.1904730498790741,
      marshal: "Kev",
      status_code: 1,
      url: "http://www.lfns.co.uk/wandering-southwards/",
      url_route: "http://www.lfns.co.uk/2017/10/15/route.xml"
   };
   const skatingEvent = {
     title: "Sunday Stroll: Wandering southwards",
     description: "A little jaunt down to wandsworth and then back southbound by the river",
     startAt: "2017-10-15 13:00:00 UTC",
     meetingPoint: {
      name: "East end of Serpentine Road",
      coordinates: {
        latitude: 51.504322,
        longitude: -0.153358
      }
     },
     halfTime: {
      name: "wandsworth road",
      coordinates: {
        latitude: 51.46823498207083,
        longitude: -0.1904730498790741
      }
     },
     distance: 10,
     leadMarshal: "Kev",
     status: {
      code: 1,
      text: "Pending"
     },
     url: "http://www.lfns.co.uk/wandering-southwards/",
     route: {
      url: "http://www.lfns.co.uk/2017/10/15/route.xml"
     }
   };

   const result = translateToModel(formData);
   expect(result.title).to.equal(skatingEvent.title);
   expect(result.description).to.equal(skatingEvent.description);
   expect(result.startAt.getTime()).to.equal((new Date(skatingEvent.startAt)).getTime());
   expect(result.meetingPoint.name).to.equal(skatingEvent.meetingPoint.name);
   expect(result.meetingPoint.coordinates.latitude).to.equal(skatingEvent.meetingPoint.coordinates.latitude);
   expect(result.meetingPoint.coordinates.longitude).to.equal(skatingEvent.meetingPoint.coordinates.longitude);
   expect(result.halfTime.name).to.equal(skatingEvent.halfTime.name);
   expect(result.halfTime.coordinates.latitude).to.equal(skatingEvent.halfTime.coordinates.latitude);
   expect(result.halfTime.coordinates.longitude).to.equal(skatingEvent.halfTime.coordinates.longitude);
   expect(result.distance).to.equal(skatingEvent.distance);
   expect(result.leadMarshal).to.equal(skatingEvent.leadMarshal);
   expect(result.status.text).to.equal(skatingEvent.status.text);
   expect(result.status.code).to.equal(skatingEvent.status.code);
   expect(result.url).to.equal(skatingEvent.url);
   expect(result.route.url).to.equal(skatingEvent.route.url)
  });
});
