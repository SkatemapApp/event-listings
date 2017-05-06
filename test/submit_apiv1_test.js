var expect = require('chai').expect;

const should = require('should'); 
var assert = require('assert');
const request = require('supertest');  
var mongoose = require('mongoose');

describe('Routing', function() {
  var url = 'http://127.0.0.1:6633';
  before(function(done) {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/event-listings')
    done();
  });
  describe('API', function() {
    it('should correctly create a skating event', function(done) {
			var formData = {
				id: '20170507',
			  name: 'Sunday Stroll: For Wander-its-worth',
 				description: 'This Sunday our star quaddie lead marshal Kev will be taking the Sunday Stroll on a wonderful wander down to Wandsworth. Hopefully the temperatures and join us with music, wheels and a willingness to have a good time!!',
 				start: '2017-05-07 13:00:00 UTC',
 				meet: 'East end of Serpentine Road',
				distance: 8,
				status: 'Pending',
				meet_lat: 51.504322,
				meet_lon: 0.153358,
				halftime: 'Wandsworth Bridge',
				halftime_lat: 51.468164805146166,
				halftime_lon: -0.19050121307373047,
				marshal: 'Kev',
				status_code: 1,
				url: 'http://www.lfns.co.uk/for-wander-its-worth/',
			  url_route: 'http://www.lfns.co.uk/2017/05/07/route.xml'
			};

		request(url)
			.post('/api/v1/submit')
      .type('form')
      .send(formData)
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
