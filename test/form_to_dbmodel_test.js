"use strict";

const expect = require('chai').expect;
const formData = require("./data/form_submissions").sunday_stroll;
const skatingEventModelList = require("./data/dbmodel").skatingEventModelList;

describe('Translate form data', function() {
  const translateToModel = require('../adapters/form_to_dbmodel').translateToModel;

  it('should correctly translate the incoming form data', function() {
   const skatingEventModel = skatingEventModelList[0];
   const result = translateToModel(formData);
   expect(result.title).to.equal(skatingEventModel.title);
   expect(result.description).to.equal(skatingEventModel.description);
   expect(result.startAt.getTime()).to.equal((new Date(skatingEventModel.startAt)).getTime());
   expect(result.meetingPoint.name).to.equal(skatingEventModel.meetingPoint.name);
   expect(result.meetingPoint.coordinates.latitude).to.equal(skatingEventModel.meetingPoint.coordinates.latitude);
   expect(result.meetingPoint.coordinates.longitude).to.equal(skatingEventModel.meetingPoint.coordinates.longitude);
   expect(result.halfTime.name).to.equal(skatingEventModel.halfTime.name);
   expect(result.halfTime.coordinates.latitude).to.equal(skatingEventModel.halfTime.coordinates.latitude);
   expect(result.halfTime.coordinates.longitude).to.equal(skatingEventModel.halfTime.coordinates.longitude);
   expect(result.distance).to.equal(skatingEventModel.distance);
   expect(result.leadMarshal).to.equal(skatingEventModel.leadMarshal);
   expect(result.status.text).to.equal(skatingEventModel.status.text);
   expect(result.status.code).to.equal(skatingEventModel.status.code);
   expect(result.url).to.equal(skatingEventModel.url);
   expect(result.route.url).to.equal(skatingEventModel.route.url)
  });
});
