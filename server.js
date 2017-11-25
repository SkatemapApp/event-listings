'use strict';

var express = require('express');
var app = express();
var routes = require('./routes');
var jsonParser = require('body-parser').json;

app.use(jsonParser());

require('./database');

app.use('/api', routes);


app.use(function(req, res, next) {
  var err = new Error('Not found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

var port = process.env.PORT || 6633;

app.listen(port, function() {
  console.log('Express server is listening on port ', port);
});
