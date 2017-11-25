"use strict";

var expect = require('chai').expect;
const validateFormSubmission = require('../utils').validateFormSubmission;
const isPositivelyNumeric = require('../utils').isPositivelyNumeric;
const isNumeric = require('../utils').isNumeric;

describe('isPositivelyNumeric', function() {
  it('should return false on a negative whole number', function() {
    expect(isPositivelyNumeric('-1')).to.be.false;
  });
  it('should return false on zero', function() {
    expect(isPositivelyNumeric('0')).to.be.false;
  });
  it('should return true on a natural number', function() {
    expect(isPositivelyNumeric('1')).to.be.true;
  });
  it('should return true on a positive floating point number', function() {
    expect(isPositivelyNumeric('1.2')).to.be.true;
  });
  it('should return false on a negative floating point number', function() {
    expect(isPositivelyNumeric('-1.2')).to.be.false;
  });
});

describe('isNumeric', function() {
  it('should return true on a negative whole number', function() {
    expect(isNumeric('-1')).to.be.true;
  });
  it('should return true on zero', function() {
    expect(isNumeric('0')).to.be.true;
  });
  it('should return true on a natural number', function() {
    expect(isNumeric('1')).to.be.true;
  });
  it('should return true on a positive floating point number', function() {
    expect(isNumeric('1.2')).to.be.true;
  });
  it('should return true on a negative floating point number', function() {
    expect(isNumeric('-1.2')).to.be.true;
  });
  it('should return false on non-numeric characters', function() {
    expect(isNumeric('1x')).to.be.false;
  });
});

describe('Validate form submission', function() {
  describe('Validate id', function() {
    it('should fail if it is absent', function() {
      expect(validateFormSubmission({})).to.be.an('array').that.includes("Missing or invalid field: 'id'");
    });

    it('should fail if it is an empty string', function() {
      expect(validateFormSubmission({id: ''})).to.be.an('array').that.includes("Missing or invalid field: 'id'");
    });

    it('should fail if it exceeds the maximum limit', function() {
      expect(validateFormSubmission({id: 'x'.repeat(65)})).to.be.an('array').that.includes("Missing or invalid field: 'id'");
    });

    it('should pass if it is within the allowed limit', function() {
      expect(validateFormSubmission({id: 'x'})).to.be.an('array').to.not.include("Missing or invalid field: 'id'");
    });
  });

  describe('Validate name', function() {
    it('should fail if it is absent', function() {
      expect(validateFormSubmission({})).to.be.an('array').that.includes("Missing or invalid field: 'name'");
    });

    it('should fail if it is an empty string', function() {
      expect(validateFormSubmission({name: ''})).to.be.an('array').that.includes("Missing or invalid field: 'name'");
    });

    it('should fail if it exceeds the maximum limit', function() {
      expect(validateFormSubmission({name: 'x'.repeat(257)})).to.be.an('array').that.includes("Missing or invalid field: 'name'");
    });

    it('should pass if it is within the allowed limit', function() {
      expect(validateFormSubmission({name: 'x'})).to.be.an('array').to.not.include("Missing or invalid field: 'name'");
    });

  });

  describe('Validate description', function() {
    it('should fail if it is absent', function() {
      expect(validateFormSubmission({})).to.be.an('array').that.includes("Missing or invalid field: 'description'");
    });

    it('should fail if it exceeds the maximum limit', function() {
      expect(validateFormSubmission({description: 'x'.repeat(2049)})).to.be.an('array').that.includes("Missing or invalid field: 'description'");
    });

    it('should pass if it is withiin the allowed limit', function() {
      expect(validateFormSubmission({description: 'x'.repeat(2048)})).to.be.an('array').to.not.include("Missing or invalid field: 'description'");
    });

  });

  describe('Validate start', function() {
    it('should fail if it is absent', function() {
      expect(validateFormSubmission({})).to.be.an('array').that.includes("Missing or invalid field: 'start'");
    });

    it('should fail if it is an empty string', function() {
      expect(validateFormSubmission({start: ''})).to.be.an('array').that.includes("Missing or invalid field: 'start'");
    });

    it('should fail if it exceeds the maximum limit', function() {
      expect(validateFormSubmission({start: 'x'.repeat(24)})).to.be.an('array').that.includes("Missing or invalid field: 'start'");
    });

    it('should fail if it is not of the correct date format', function() {
      expect(validateFormSubmission({start: 'x'.repeat(23)})).to.be.an('array').that.includes("Missing or invalid field: 'start'");
    });

    it('should pass if it is the correct date format', function() {
      expect(validateFormSubmission({start: '2017-05-07 13:00:00 UTC'})).to.be.an('array').to.not.include("Missing or invalid field: 'start'");
    });

  });

  describe('Validate meet', function() {
    it('should fail if it is absent', function() {
      expect(validateFormSubmission({})).to.be.an('array').that.includes("Missing or invalid field: 'meet'");
    });

    it('should fail if it is an empty string', function() {
      expect(validateFormSubmission({meet: ''})).to.be.an('array').that.includes("Missing or invalid field: 'meet'");
    });

    it('should fail if it exceeds the maximum limit', function() {
      expect(validateFormSubmission({meet: 'x'.repeat(65)})).to.be.an('array').that.includes("Missing or invalid field: 'meet'");
    });

    it('should succeed if it is within the allowed limit', function() {
      expect(validateFormSubmission({meet: 'Serpentine Road Bandstand'})).to.not.include("Missing or invalid field: 'meet'");
    });

  });

  describe('Validate distance', function() {
    it('should fail if it is absent', function() {
      expect(validateFormSubmission({})).to.be.an('array').that.includes("Missing or invalid field: 'distance'");
    });

    it('should fail if it is an empty string', function() {
      expect(validateFormSubmission({distance: ''})).to.be.an('array').that.includes("Missing or invalid field: 'distance'");
    });

    it('should fail if it is not numeric', function() {
      expect(validateFormSubmission({distance: '10 miles'})).to.be.an('array').that.includes("Missing or invalid field: 'distance'");
    });

    it('should fail if it is a negative whole number', function() {
      expect(validateFormSubmission({distance: '-10'})).to.be.an('array').that.includes("Missing or invalid field: 'distance'");
    });

    it('should fail if it is a negative floating point number', function() {
      expect(validateFormSubmission({distance: '-10.3'})).to.be.an('array').that.includes("Missing or invalid field: 'distance'");
    });

    it('should fail if it is zero', function() {
      expect(validateFormSubmission({distance: '0'})).to.be.an('array').that.includes("Missing or invalid field: 'distance'");
    });
  });

  describe('Validate Status', function() {
    it('should fail if it is absent', function() {
      expect(validateFormSubmission({})).to.be.an('array').that.includes("Missing or invalid field: 'status'");
    });

    it('should fail if it is an empty string', function() {
      expect(validateFormSubmission({status: ''})).to.be.an('array').that.includes("Missing or invalid field: 'status'");
    });

    it('should fail if it is not one of the allowed values', function() {
      expect(validateFormSubmission({status: 'x'})).to.be.an('array').that.includes("Missing or invalid field: 'status'");
    });

    it('should succeed if it is Pending', function() {
      expect(validateFormSubmission({status: 'Pending'})).to.not.include("Missing or invalid field: 'status'");
    });

    it('should succeed if it is GO!', function() {
      expect(validateFormSubmission({status: 'GO!'})).to.not.include("Missing or invalid field: 'status'");
    });

    it('should succeed if it is Wait', function() {
      expect(validateFormSubmission({status: 'Wait'})).to.not.include("Missing or invalid field: 'status'");
    });

    it('should succeed if it is Rained Off', function() {
      expect(validateFormSubmission({status: 'Rained Off'})).to.not.include("Missing or invalid field: 'status'");
    });

    it('should succeed if it is Completed', function() {
      expect(validateFormSubmission({status: 'Completed'})).to.not.include("Missing or invalid field: 'status'");
    });

    it('should succeed if it is Deleted', function() {
      expect(validateFormSubmission({status: 'Deleted'})).to.not.include("Missing or invalid field: 'status'");
    });
  });

  describe('Validate meet_lat', function() {
    it('should fail if it is absent', function() {
      expect(validateFormSubmission({})).to.be.an('array').that.includes("Missing or invalid field: 'meet_lat'");
    });

    it('should fail if it is an empty string', function() {
      expect(validateFormSubmission({meet_lat: ''})).to.be.an('array').that.includes("Missing or invalid field: 'meet_lat'");
    });

    it('should fail if it is not numeric', function() {
      expect(validateFormSubmission({meet_lat: '1x'})).to.be.an('array').that.includes("Missing or invalid field: 'meet_lat'");
    });

    it('should fail if it is more than +180', function() {
      expect(validateFormSubmission({meet_lat: '180.1'})).to.be.an('array').that.includes("Missing or invalid field: 'meet_lat'");
    });

    it('should fail if it is less than -180', function() {
      expect(validateFormSubmission({meet_lat: '-180.1'})).to.be.an('array').that.includes("Missing or invalid field: 'meet_lat'");
    });

    it('should succeed if it is between 0 and 180 inclusive', function() {
      expect(validateFormSubmission({meet_lat: '180'})).to.be.an('array').to.not.include("Missing or invalid field: 'meet_lat'");
    });

    it('should succeed if it is between -180 and 0 inclusive', function() {
      expect(validateFormSubmission({meet_lat: '180'})).to.be.an('array').to.not.include("Missing or invalid field: 'meet_lat'");
    });

    it('should succeed if it is 0', function() {
      expect(validateFormSubmission({meet_lat: '0'})).to.be.an('array').to.not.include("Missing or invalid field: 'meet_lat'");
    });

  });

  describe('Validate meet_lon', function() {
    it('should fail if it is absent', function() {
      expect(validateFormSubmission({})).to.be.an('array').that.includes("Missing or invalid field: 'meet_lon'");
    });

    it('should fail if it is an empty string', function() {
      expect(validateFormSubmission({meet_lon: ''})).to.be.an('array').that.includes("Missing or invalid field: 'meet_lon'");
    });

    it('should fail if it is not numeric', function() {
      expect(validateFormSubmission({meet_lon: '1x'})).to.be.an('array').that.includes("Missing or invalid field: 'meet_lon'");
    });

    it('should fail if it is more than +180', function() {
      expect(validateFormSubmission({meet_lon: '180.1'})).to.be.an('array').that.includes("Missing or invalid field: 'meet_lon'");
    });

    it('should fail if it is less than -180', function() {
      expect(validateFormSubmission({meet_lon: '-180.1'})).to.be.an('array').that.includes("Missing or invalid field: 'meet_lon'");
    });

    it('should succeed if it is between 0 and 180 inclusive', function() {
      expect(validateFormSubmission({meet_lon: '180'})).to.be.an('array').to.not.include("Missing or invalid field: 'meet_lon'");
    });

    it('should succeed if it is between -180 and 0 inclusive', function() {
      expect(validateFormSubmission({meet_lon: '180'})).to.be.an('array').to.not.include("Missing or invalid field: 'meet_lon'");
    });

    it('should succeed if it is 0', function() {
      expect(validateFormSubmission({meet_lon: '0'})).to.be.an('array').to.not.include("Missing or invalid field: 'meet_lon'");
    });

  });

  describe('Validate halftime', function() {
    it('should fail if it is absent', function() {
      expect(validateFormSubmission({})).to.be.an('array').that.includes("Missing or invalid field: 'halftime'");
    });

    it('should fail if it is an empty string', function() {
      expect(validateFormSubmission({halftime: ''})).to.be.an('array').that.includes("Missing or invalid field: 'halftime'");
    });

    it('should fail if it exceeds the maximum limit', function() {
      expect(validateFormSubmission({halftime: 'x'.repeat(65)})).to.be.an('array').that.includes("Missing or invalid field: 'halftime'");
    });

    it('should succeed if it is within the allowed limit', function() {
      expect(validateFormSubmission({halftime: 'Serpentine Road Bandstand'})).to.not.include("Missing or invalid field: 'halftime'");
    });

  });

  describe('Validate halftime_lat', function() {
    it('should fail if it is absent', function() {
      expect(validateFormSubmission({})).to.be.an('array').that.includes("Missing or invalid field: 'halftime_lat'");
    });

    it('should fail if it is an empty string', function() {
      expect(validateFormSubmission({halftime_lat: ''})).to.be.an('array').that.includes("Missing or invalid field: 'halftime_lat'");
    });

    it('should fail if it is not numeric', function() {
      expect(validateFormSubmission({halftime_lat: '1x'})).to.be.an('array').that.includes("Missing or invalid field: 'halftime_lat'");
    });

    it('should fail if it is more than +180', function() {
      expect(validateFormSubmission({halftime_lat: '180.1'})).to.be.an('array').that.includes("Missing or invalid field: 'halftime_lat'");
    });

    it('should fail if it is less than -180', function() {
      expect(validateFormSubmission({halftime_lat: '-180.1'})).to.be.an('array').that.includes("Missing or invalid field: 'halftime_lat'");
    });

    it('should succeed if it is between 0 and 180 inclusive', function() {
      expect(validateFormSubmission({halftime_lat: '180'})).to.be.an('array').to.not.include("Missing or invalid field: 'halftime_lat'");
    });

    it('should succeed if it is between -180 and 0 inclusive', function() {
      expect(validateFormSubmission({halftime_lat: '180'})).to.be.an('array').to.not.include("Missing or invalid field: 'halftime_lat'");
    });

    it('should succeed if it is 0', function() {
      expect(validateFormSubmission({halftime_lat: '0'})).to.be.an('array').to.not.include("Missing or invalid field: 'halftime_lat'");
    });

  });

  describe('Validate halftime_lon', function() {
    it('should fail if it is absent', function() {
      expect(validateFormSubmission({})).to.be.an('array').that.includes("Missing or invalid field: 'halftime_lon'");
    });

    it('should fail if it is an empty string', function() {
      expect(validateFormSubmission({halftime_lon: ''})).to.be.an('array').that.includes("Missing or invalid field: 'halftime_lon'");
    });

    it('should fail if it is not numeric', function() {
      expect(validateFormSubmission({halftime_lon: '1x'})).to.be.an('array').that.includes("Missing or invalid field: 'halftime_lon'");
    });

    it('should fail if it is more than +180', function() {
      expect(validateFormSubmission({halftime_lon: '180.1'})).to.be.an('array').that.includes("Missing or invalid field: 'halftime_lon'");
    });

    it('should fail if it is less than -180', function() {
      expect(validateFormSubmission({halftime_lon: '-180.1'})).to.be.an('array').that.includes("Missing or invalid field: 'halftime_lon'");
    });

    it('should succeed if it is between 0 and 180 inclusive', function() {
      expect(validateFormSubmission({halftime_lon: '180'})).to.be.an('array').to.not.include("Missing or invalid field: 'halftime_lon'");
    });

    it('should succeed if it is between -180 and 0 inclusive', function() {
      expect(validateFormSubmission({halftime_lon: '180'})).to.be.an('array').to.not.include("Missing or invalid field: 'halftime_lon'");
    });

    it('should succeed if it is 0', function() {
      expect(validateFormSubmission({halftime_lon: '0'})).to.be.an('array').to.not.include("Missing or invalid field: 'halftime_lon'");
    });
  });

  describe('Validate marshal', function() {
    it('should fail if it is absent', function() {
      expect(validateFormSubmission({})).to.be.an('array').that.includes("Missing or invalid field: 'marshal'");
    });

    it('should fail it is an empty string', function() {
      expect(validateFormSubmission({marshal: ''})).to.be.an('array').that.includes("Missing or invalid field: 'marshal'");
    });

    it('should fail if it exceeds the maximum limit', function() {
      expect(validateFormSubmission({marshal: 'x'.repeat(65)})).to.be.an('array').that.includes("Missing or invalid field: 'marshal'");
    });

    it('should succeed it does not exceed the maximum limit', function() {
      expect(validateFormSubmission({marshal: 'Jane Doe'})).to.be.an('array').to.not.include("Missing or invalid field: 'marshal'");
    });

  });

  describe('Validate status_code', function() {
    it('should fail if it is absent', function() {
      expect(validateFormSubmission({})).to.be.an('array').that.includes("Missing or invalid field: 'status_code'");
    });

    it('should fail if it is an empty string', function() {
      expect(validateFormSubmission({status_code: ''})).to.be.an('array').that.includes("Missing or invalid field: 'status_code'");
    });

    it('should fail if it is not numeric', function() {
      expect(validateFormSubmission({status_code: '1 alpha'})).to.be.an('array').that.includes("Missing or invalid field: 'status_code'");
    });

    it('should fail if it is a negative whole number', function() {
      expect(validateFormSubmission({status_code: '-10'})).to.be.an('array').that.includes("Missing or invalid field: 'status_code'");
    });

    it('should fail if it is a negative floating point number', function() {
      expect(validateFormSubmission({status_code: '-10.3'})).to.be.an('array').that.includes("Missing or invalid field: 'status_code'");
    });

    it('should fail if it is below the acceptable range', function() {
      expect(validateFormSubmission({status_code: '-1'})).to.be.an('array').that.includes("Missing or invalid field: 'status_code'");
    });

    it('should fail if it is above the acceptable range', function() {
      expect(validateFormSubmission({status_code: '5'})).to.be.an('array').that.includes("Missing or invalid field: 'status_code'");
    });

    it('should pass if it is within the acceptable range', function() {
      expect(validateFormSubmission({status_code: '3'})).to.be.an('array').to.not.include("Missing or invalid field: 'status_code'");
    });

  });

  describe('Validate url', function() {
    it('should fail if it is absent', function() {
      expect(validateFormSubmission({})).to.be.an('array').that.includes("Missing or invalid field: 'url'");
    });

    it('should fail if it is an empty string', function() {
      expect(validateFormSubmission({url: ''})).to.be.an('array').that.includes("Missing or invalid field: 'url'");
    });

    it('should fail if it is not a URL', function() {
      expect(validateFormSubmission({url: 'a'})).to.be.an('array').that.includes("Missing or invalid field: 'url'");
    });

    it('should pass if it is a properly formatted URL', function() {
      expect(validateFormSubmission({url: 'http://www.lfns.co.uk/for-wander-its-worth/'})).to.be.an('array').to.not.include("Missing or invalid field: 'url'");
    });
  });

  describe('Validate url', function() {
    it('should fail if it is absent', function() {
      expect(validateFormSubmission({})).to.be.an('array').that.includes("Missing or invalid field: 'url'");
    });

    it('should fail if it is an empty string', function() {
      expect(validateFormSubmission({url: ''})).to.be.an('array').that.includes("Missing or invalid field: 'url'");
    });

    it('should fail if it is not a URL', function() {
      expect(validateFormSubmission({url: 'a'})).to.be.an('array').that.includes("Missing or invalid field: 'url'");
    });

    it('should pass if it is a properly formatted URL', function() {
      expect(validateFormSubmission({url: 'http://www.lfns.co.uk/for-wander-its-worth/'})).to.be.an('array').to.not.include("Missing or invalid field: 'url'");
    });
  });

  describe('Validate url_route', function() {
    it('should fail if it is absent', function() {
      expect(validateFormSubmission({})).to.be.an('array').that.includes("Missing or invalid field: 'url_route'");
    });

    it('should fail if it is an empty string', function() {
      expect(validateFormSubmission({url_route: ''})).to.be.an('array').that.includes("Missing or invalid field: 'url_route'");
    });

    it('should fail if it is not a URL', function() {
      expect(validateFormSubmission({url_route: 'a'})).to.be.an('array').that.includes("Missing or invalid field: 'url_route'");
    });

    it('should pass if it is a properly formatted URL', function() {
      expect(validateFormSubmission({url_route: 'http://www.lfns.co.uk/2017/05/07/route.xml'})).to.be.an('array').to.not.include("Missing or invalid field: 'url_route'");
    });
  });



});
