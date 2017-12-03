var expect = require('chai').expect;

const request = require('supertest');
const sundayStrollFormData = require('./data/form_submissions').sunday_stroll;
const fridayNightFormData = require('./data/form_submissions').friday_night;

const dateTimeRegEx = new RegExp('^20[0-9][0-9]-[0-9][0-9]-[0-9][0-9] [0-9][0-9]:[0-9][0-9]:[0-9][0-9]$');


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
                        expect(skatingEvent.name).to.equal(sundayStrollFormData.name);
                        expect(skatingEvent.description).to.equal(sundayStrollFormData.description);
                        expect(skatingEvent.start).to.equal(sundayStrollFormData.start.substr(0, 19));
                        expect(skatingEvent.meet).to.equal(sundayStrollFormData.meet);
                        expect(skatingEvent.meet_latlon).to.deep.equal([sundayStrollFormData.meet_lat, sundayStrollFormData.meet_lon]);
                        expect(skatingEvent.halftime).to.equal(sundayStrollFormData.halftime);
                        expect(skatingEvent.halftime_latlon).to.deep.equal([sundayStrollFormData.halftime_lat, sundayStrollFormData.halftime_lon]);
                        expect(skatingEvent.distance).to.equal(sundayStrollFormData.distance);
                        expect(skatingEvent.marshal).to.equal(sundayStrollFormData.marshal);
                        expect(skatingEvent.status).to.equal(sundayStrollFormData.status);
                        expect(skatingEvent.status_code).to.equal(sundayStrollFormData.status_code);
                        expect(skatingEvent.url).to.equal(sundayStrollFormData.url);
                        expect(skatingEvent.added).to.match(dateTimeRegEx);
                        expect(skatingEvent.last_modified).to.match(dateTimeRegEx);
                        expect(skatingEvent.last_modified_route).to.match(dateTimeRegEx);
                        expect(skatingEvent.route).to.be.an('array').that.is.empty;
                        done();
                    });
            });
        });


    });


    describe('submit a Friday night skate entry', function() {

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
                    expect(res.body).to.be.empty;
                    done();
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
