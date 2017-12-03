var expect = require('chai').expect;

const request = require('supertest');
const sundayStrollFormData = require('./data/form_submissions').sunday_stroll;
const fridayNightFormData = require('./data/form_submissions').friday_night;

const dateTimeRegEx = new RegExp('^20[0-9][0-9]-[0-9][0-9]-[0-9][0-9] [0-9][0-9]:[0-9][0-9]:[0-9][0-9]$');

function verifyCoordinates(input, output) {
  if (input.lat === undefined || input.lon === undefined) {
    expect(output).to.be.an('array').that.is.empty;
  } else {
    expect(output).to.be.an('array')
      .that.is.to.have.lengthOf(2)
      .to.include.deep.ordered.members([input.lat, input.lon]);
  }
}

function verifySkatingEvent(input, output) {
    expect(output.name).to.equal(input.name);
    expect(output.description).to.equal(input.description);
    expect(output.start).to.equal(input.start.substr(0, 19));
    expect(output.meet).to.equal(input.meet);
    verifyCoordinates({ lat: input.meet_lat, lon: input.meet_lon },
        output.meet_latlon);
    expect(output.halftime).to.equal(input.halftime);
    verifyCoordinates({ lat: input.halftime_lat, lon: input.halftime_lon },
        output.halftime_latlon);
    expect(output.distance).to.equal(input.distance);
    expect(output.marshal).to.equal(input.marshal);
    expect(output.status).to.equal(input.status);
    expect(output.status_code).to.equal(input.status_code);
    expect(output.url).to.equal(input.url);
    expect(output.added).to.match(dateTimeRegEx);
    expect(output.last_modified).to.match(dateTimeRegEx);
    expect(output.last_modified_route).to.match(dateTimeRegEx);
    expect(output.route).to.be.an('array').that.is.empty;
}

describe('API', function() {
    var api_root_url = process.env.API_ROOT_URL || 'http://127.0.0.1:6633';
    describe('form submission via the POST request', function() {
        var createdResourceUrl;
        it('should correctly create a skating event', function(done) {

            request(api_root_url)
                .post('/skating-events')
                .type('form')
                .send(sundayStrollFormData)
                .expect(201)
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    createdResourceUrl = res.header.location;
                    const expectedUrlPattern = new RegExp('^' + api_root_url + '/skating-events/'+ '[0-9a-fA-F]+$');
                    expect(createdResourceUrl).to.match(expectedUrlPattern);
                    expect(res.body).to.be.empty;
                    done();
                });
        });

        describe('retrieving the skating event returned in the header of the preceeding POST request', function() {
            it('should return the skating event created in that POST request', function(done) {
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
                        verifySkatingEvent(sundayStrollFormData, skatingEvent);
                        done();
                    });
            });
        });


    });


    describe('submit a Friday night skate entry', function() {
        var createdResourceUrl;
        it('should correctly create a skating event', function(done) {
            request(api_root_url)
                .post('/skating-events')
                .type('form')
                .send(fridayNightFormData)
                .expect(201)
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    createdResourceUrl = res.header.location;
                    const expectedUrlPattern = new RegExp('^' + api_root_url + '/skating-events/'+ '[0-9a-fA-F]+$');
                    expect(createdResourceUrl).to.match(expectedUrlPattern);
                    expect(res.body).to.be.empty;
                    done();
                });
        });

        describe('retrieving the skating event returned in the header of the preceeding POST request', function() {
            it('should return the skating event created in that POST request', function(done) {
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
                        verifySkatingEvent(fridayNightFormData, skatingEvent);
                        done();
                    });
            });
        });

        describe('retrieving skating events list using the GET request', function() {
            it('should correctly return a list of skating events', function(done) {

                request(api_root_url)
                    .get('/skating-events')
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function(err, res) {
                        if (err) {
                            throw err;
                        }
                        const result = res.body;
                        expect(result).to.have.all.keys('version', 'retrieved', 'skates');
                        expect(result).to.have.property('version', 1);
                        expect(result.retrieved).to.match(dateTimeRegEx);
                        expect(result.skates).to.be.an('object');

                        for (var key in result.skates) {
                            expect(result.skates[key]).to.have.all.keys('name', 'description',
                                'start', 'meet', 'meet_latlon', 'halftime', 'halftime_latlon',
                                'distance', 'marshal', 'status', 'status_code', 'url', 'added',
                                'last_modified', 'last_modified_route', 'route');
                        }
                        done();
                    });
            });
        });
    });

    describe('form submission with empty fields', function() {
        it('should return an error', function(done) {
            request(api_root_url)
                .post('/skating-events')
                .type('form')
                .send({})
                .expect(400)
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    done();
                });
        });
    });
});
