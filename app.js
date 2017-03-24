'use strict';

var express = require("express");
var app = express();
var routes = require("./routes");

app.use("/skatingEvents", routes);

var port = process.env.PORT || 6633;

app.listen(port, function() {
  console.log("Express server is listening on port ", port);
});
