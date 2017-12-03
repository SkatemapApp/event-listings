'use strict';

var validator = require('validator');

function toUtc(dateString) {
    return new Date(dateString).toISOString().replace('T', ' ').substr(0, 19);
}

function isPositivelyNumeric(n) {
    return isNumeric(n) && n>0;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isValidCoordinate(n) {
    return isNumeric(n) && Math.abs(n) <= 180;
}

function isValidStatusCode(n) {
    return isNumeric(n) && n >=0 && n <= 4;
}

const dateTimeRegEx = new RegExp('^20[0-9][0-9]-[0-9][0-9]-[0-9][0-9] [0-9][0-9]:[0-9][0-9]:[0-9][0-9] UTC$');

function validateFormSubmission(formData) {
    var messages = [];
    //id
    if (typeof formData.id === 'undefined' || formData.id.length == 0 || formData.id.length > 64) {
        messages.push('Missing or invalid field: \'id\'');
    }

    //name
    if (typeof formData.name === 'undefined' || formData.name.length == 0 || formData.name.length > 256) {
        messages.push('Missing or invalid field: \'name\'');
    }

    //description
    if (typeof formData.description === 'undefined'|| formData.description.length > 2048) {
        messages.push('Missing or invalid field: \'description\'');
    }

    //start
    if (typeof formData.start === 'undefined'
      || formData.start.length == 0
      || formData.start.length > 23
      || formData.start.match(dateTimeRegEx) == null) {
        messages.push('Missing or invalid field: \'start\'');
    }

    //meet
    if (typeof formData.meet === 'undefined'
      || formData.meet.length == 0
      || formData.meet.length > 64) {
        messages.push('Missing or invalid field: \'meet\'');
    }

    //distance
    if (typeof formData.distance === 'undefined'
      || !isPositivelyNumeric(formData.distance)) {
        messages.push('Missing or invalid field: \'distance\'');
    }

    //status
    const valid_statuses = ['Pending', 'GO!', 'Wait', 'Rained Off', 'Completed', 'Deleted'];
    if (typeof formData.status === 'undefined'
      || valid_statuses.indexOf(formData.status) === -1) {
        messages.push('Missing or invalid field: \'status\'');
    }

    //meet_lat
    if (typeof formData.meet_lat === 'undefined'
      || !isValidCoordinate(formData.meet_lat)) {
        messages.push('Missing or invalid field: \'meet_lat\'');
    }

    //meet_lon
    if (typeof formData.meet_lon === 'undefined'
      || !isValidCoordinate(formData.meet_lon)) {
        messages.push('Missing or invalid field: \'meet_lon\'');
    }

    //halftime
    if (typeof formData.halftime === 'undefined'
      || formData.halftime.length == 0
      || formData.halftime.length > 64) {
        messages.push('Missing or invalid field: \'halftime\'');
    }

    //halftime_lat
    if (typeof formData.halftime_lat !== 'undefined'
      && !isValidCoordinate(formData.halftime_lat)) {
        messages.push('Missing or invalid field: \'halftime_lat\'');
    }

    //halftime_lon
    if (typeof formData.halftime_lon !== 'undefined'
      && !isValidCoordinate(formData.halftime_lon)) {
        messages.push('Missing or invalid field: \'halftime_lon\'');
    }

    //marshal
    if (typeof formData.marshal === 'undefined'
      || formData.marshal.length == 0
      || formData.marshal.length > 64) {
        messages.push('Missing or invalid field: \'marshal\'');
    }

    //status_code
    if (typeof formData.status_code === 'undefined'
      || !isValidStatusCode(formData.status_code)) {
        messages.push('Missing or invalid field: \'status_code\'');
    }

    //url
    if (typeof formData.url === 'undefined'
      || !validator.isURL(formData.url)) {
        messages.push('Missing or invalid field: \'url\'');
    }

    //url_route
    if (typeof formData.url_route === 'undefined'
      || !validator.isURL(formData.url_route)) {
        messages.push('Missing or invalid field: \'url_route\'');
    }

    return messages;
}

module.exports.toUtc = toUtc;
module.exports.validateFormSubmission = validateFormSubmission;
module.exports.isPositivelyNumeric = isPositivelyNumeric;
module.exports.isNumeric = isNumeric;
