'use strict';

var url = require('url');


var Developers = require('./DevelopersService');


module.exports.retrieveSkatingEvent = function retrieveSkatingEvent (req, res, next) {
  Developers.retrieveSkatingEvent(req.swagger.params, res, next);
};

module.exports.retrieveSkatingEvents = function retrieveSkatingEvents (req, res, next) {
  Developers.retrieveSkatingEvents(req.swagger.params, res, next);
};
