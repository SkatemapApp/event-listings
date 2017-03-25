'use strict';

var express = require("express");
var app = express();
var routes = require("./routes");


var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/event-listings')

var db = mongoose.connection;
db.on("error", function(err) {
  console.error("connection error:", err);
});

db.once("open", function() {
  console.log("db connection successful");
});


app.use("/skatingEvents", routes);


app.use(function(req, res, next) {
  var err = new Error("Not found");
  err.status = 404;
  next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});



var port = process.env.PORT || 6633;

app.listen(port, function() {
  console.log("Express server is listening on port ", port);
});
