var expect = require('chai').expect;

const should = require('should');
var assert = require('assert');
const request = require('supertest');
const formData = require("./data/form_submissions").sunday_stroll;

describe('API', function() {
  var api_root_url = process.env.API_ROOT_URL || 'http://127.0.0.1:6633'
  describe('form submission via the POST request', function() {
    var createdResourceUrl;
    it('should correctly create a skating event', function(done) {
;
		request(api_root_url)
			.post('/api/skating-events/submit')
      .type('form')
      .send(formData)
			.expect(201)
			.end(function(err,res) {
				if (err) {
					throw err;
				}
        createdResourceUrl = res.header.location;
        const expectedUrlPattern = new RegExp('^' + api_root_url + '/api' + '/skating-events/'+ '[0-9a-fA-F]+$');
        expect(createdResourceUrl).to.match(expectedUrlPattern);
        expect(res.body).to.be.empty
				done();
			});
		});

    describe('retrieving a submitted skating event via the GET request', function() {
      it('should correctly return that skating event', function(done) {
        request(createdResourceUrl)
          .get('/')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err,res) {
            if (err) {
              throw err;
            }
            const result = res.body;
            const skatingEventId = (Object.keys(res.body)).pop();
            const skatingEvent = result[skatingEventId];
            expect(skatingEvent.name).to.equal(formData.name);
            expect(skatingEvent.description).to.equal(formData.description);
            expect(skatingEvent.start).to.equal(formData.start.substr(0, 19));
            expect(skatingEvent.meet).to.equal(formData.meet);
            expect(skatingEvent.meet_latlon).to.deep.equal([formData.meet_lat, formData.meet_lon]);
            expect(skatingEvent.halftime).to.equal(formData.halftime);
            expect(skatingEvent.halftime_latlon).to.deep.equal([formData.halftime_lat, formData.halftime_lon]);
            expect(skatingEvent.distance).to.equal(formData.distance);
            expect(skatingEvent.marshal).to.equal(formData.marshal);
            expect(skatingEvent.status).to.equal(formData.status);
            expect(skatingEvent.status_code).to.equal(formData.status_code);
            expect(skatingEvent.url).to.equal(formData.url);
            const dateTimeRegEx = new RegExp('^20[0-9][0-9]-[0-9][0-9]-[0-9][0-9] [0-9][0-9]:[0-9][0-9]:[0-9][0-9]$');
            expect(skatingEvent.added).to.match(dateTimeRegEx);
            expect(skatingEvent.last_modified).to.match(dateTimeRegEx);
            expect(skatingEvent.last_modified_route).to.match(dateTimeRegEx);
            expect(skatingEvent.route).to.be.an('array').that.is.empty;
            done();
          });
      });
    });


  });
});
