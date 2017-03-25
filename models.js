'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CoordinatesSchema = new Schema({
  latitude: Number,
  longitude: Number
});


var LocationSchema = new Schema({
  name: String,
  coordinates: CoordinatesSchema
});

var StatusSchema = new Schema({
  code: Number,
  text: String
});


var SegmentSchema = new Schema({
  markers: [CoordinatesSchema]
});


var RouteSchema = new Schema({
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  segments: [SegmentSchema],
  url: String
});

var SkatingEventSchema = new Schema({
  title: String,
  description: String,
  startAt: Date,
  meetingPoint: LocationSchema,
  halfTime: LocationSchema,
  distance: Number,
  leadMarshal: String,
  status: StatusSchema,
  url: String,
  route: RouteSchema,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

var SkatingEvent = mongoose.model("SkatingEvent", SkatingEventSchema);
module.exports.SkatingEvent = SkatingEvent
