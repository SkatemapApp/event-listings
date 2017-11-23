var expect = require('chai').expect;

const should = require('should');
var assert = require('assert');
const request = require('supertest');
var translateToModel = require("../adapters/form_to_dbmodel").translateToModel;
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
            done();
          });
      });
    });


  });
});
