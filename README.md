# event-listings

[![Build Status](https://travis-ci.org/SkatemapApp/event-listings.svg?branch=master)](https://travis-ci.org/SkatemapApp/event-listings)

## Docker

### Setting up
```
$ docker-compose up
```

To bring up containers one-by-one (if the server is unable to find the database):
```
$ docker-compose build
$ docker-compose up -d database
$ docker-compose up -d web
```

### Running tests
```
npm test
```

### Tearing down
To bring everything down:
```
$ docker-compose down
```
