'use strict';

var url = require('url');


var Admins = require('./AdminsService');


module.exports.addSkatingEvent = function addSkatingEvent (req, res, next) {
  Admins.addSkatingEvent(req.swagger.params, res, next);
};

module.exports.updateSkatingEvent = function updateSkatingEvent (req, res, next) {
  Admins.updateSkatingEvent(req.swagger.params, res, next);
};
