'use strict';

var express = require("express");
var router = express.Router();

// GET /skatingEvents
router.get("/", function(req, res) {
  res.json({response: "GET request"});
});

// POST /skatingEvents
router.post("/", function(req, res) {
  res.json({
    response: "POST request",
    body: req.body
  });
});

// GET /skatingEvents/id
router.put("/:id", function(req, res) {
  res.json({
    response: "PUT request for ID " + req.params.id
  });
});

// DELETE /skatingEvents/id
router.delete("/:id", function(req, res) {
  res.json({
    response: "DELETE request for ID " + req.params.id
  });
});

module.exports = router;
