"use strict";

const expect = require('chai').expect;
const skatingEventModelList = require("./data/dbmodel").skatingEventModelList;
const toUtcString = require("../utils").toUtc;

function verifySkatingEvent(skatingEvent, skatingEventModel) {
    expect(skatingEvent.name).to.equal(skatingEventModel.title);
    expect(skatingEvent.description).to.equal(skatingEventModel.description);
    expect(skatingEvent.start).to.equal(toUtcString(skatingEventModel.startAt));
    expect(skatingEvent.meet).to.equal(skatingEventModel.meetingPoint.name);
    expect(skatingEvent.meet_latlon).to.deep.equal([skatingEventModel.meetingPoint.coordinates.latitude, skatingEventModel.meetingPoint.coordinates.longitude]);
    expect(skatingEvent.halftime).to.equal(skatingEventModel.halfTime.name);
    expect(skatingEvent.halftime_latlon).to.deep.equal([skatingEventModel.halfTime.coordinates.latitude, skatingEventModel.halfTime.coordinates.longitude]);
    expect(skatingEvent.distance).to.equal(skatingEventModel.distance);
    expect(skatingEvent.marshal).to.equal(skatingEventModel.leadMarshal);
    expect(skatingEvent.status).to.equal(skatingEventModel.status.text);
    expect(skatingEvent.status_code).to.equal(skatingEventModel.status.code);
    expect(skatingEvent.url).to.equal(skatingEventModel.url);
    expect(skatingEvent.added).to.equal(toUtcString(skatingEventModel.createdAt));
    expect(skatingEvent.last_modified).to.equal(toUtcString(skatingEventModel.updatedAt));
    expect(skatingEvent.last_modified_route).to.equal(toUtcString(skatingEventModel.route.updatedAt));
    expect(skatingEvent.route).to.be.an('array').that.is.empty;
}

describe('Translate DB model', function() {
  const translateToApiV1 = require('../adapters/dbmodel_to_apiv1').translateToApiV1;
  const translateToApiV1List = require('../adapters/dbmodel_to_apiv1').translateToApiV1List;

  it('should correctly translate the db model to APIv1 representation', function() {

      const skatingEventModel = skatingEventModelList[0];
   const result = translateToApiV1(skatingEventModel);
   const skatingEventId = (Object.keys(result)).pop();
   const skatingEvent = result[skatingEventId];
   verifySkatingEvent(skatingEvent, skatingEventModel);
  });

  it('should correctly translate a list of db models to APIv1 representation', function() {

      const result = translateToApiV1List(skatingEventModelList);
      expect(result.version).to.equal(1);
      const dateTimeRegEx = new RegExp('^20[0-9][0-9]-[0-9][0-9]-[0-9][0-9] [0-9][0-9]:[0-9][0-9]:[0-9][0-9]$');
      expect(result.retrieved).to.match(dateTimeRegEx);
      const skates = result.skates;
      for (var i = 0; i < skatingEventModelList.length; ++i) {
          const skatingEventId = skatingEventModelList[i]._id;
          const skatingEvent = skates[skatingEventId];
          verifySkatingEvent(skatingEvent, skatingEventModelList[i]);
      }

  })
});
