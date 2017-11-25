'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RouteSchema = new Schema({
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  segments: [{
    markers: [{
      latitude: Number,
      longitude: Number,
    }],
  }],
  url: String,
});

var SkatingEventSchema = new Schema({
  title: String,
  description: String,
  startAt: Date,
  meetingPoint: {
    name: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  halfTime: {
    name: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  distance: Number,
  leadMarshal: String,
  status: {
    code: Number,
    text: String,
  },
  url: String,
  route: RouteSchema,
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
});

var SkatingEvent = mongoose.model('SkatingEvent', SkatingEventSchema);
module.exports.SkatingEvent = SkatingEvent;
