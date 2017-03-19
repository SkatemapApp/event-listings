'use strict';

exports.retrieveSkatingEvent = function(args, res, next) {
  /**
   * parameters expected in the args:
  * skatingEventId (String)
  **/
    var examples = {};
  examples['application/json'] = {
  "distance" : 8.5,
  "halfTime" : "",
  "description" : "This week we are going central to see some of the tourist sites of central London heading through Mayfair, a short jaunt south of the River Thames before passing Parliament in Westminster to head back to Hyde Park. Come and and make you Sunday a fun-day with your lead marshal Emily making an attempt to over-ride the weather this week. See you there!",
  "title" : "Wild Wild West(minster)",
  "url" : "http://www.lfns.co.uk/wild-wild-westminster/",
  "createdAt" : "2017-02-16T07:13:01Z",
  "route" : {
    "createdAt" : "2016-08-29T09:12:33.001Z",
    "url" : "http://www.lfns.co.uk/2017/02/19/route.xml",
    "updatedAt" : "2016-08-29T09:12:33.001Z",
    "segments" : [ {
      "paths" : [ "" ]
    } ]
  },
  "meetingPoint" : {
    "name" : "Serpentine Road",
    "coordinates" : {
      "latitude" : 51.504322,
      "longtitude" : -0.153358
    }
  },
  "leadMarshal" : "Emily",
  "id" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "startAt" : "2017-02-19T14:00:00Z",
  "status" : {
    "code" : 2,
    "text" : "GO!"
  },
  "updatedAt" : "2017-02-16T07:13:01Z"
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.retrieveSkatingEvents = function(args, res, next) {
  /**
   * parameters expected in the args:
  * searchString (String)
  * skip (Integer)
  * limit (Integer)
  **/
    var examples = {};
  examples['application/json'] = [ {
  "distance" : 8.5,
  "halfTime" : "",
  "description" : "This week we are going central to see some of the tourist sites of central London heading through Mayfair, a short jaunt south of the River Thames before passing Parliament in Westminster to head back to Hyde Park. Come and and make you Sunday a fun-day with your lead marshal Emily making an attempt to over-ride the weather this week. See you there!",
  "title" : "Wild Wild West(minster)",
  "url" : "http://www.lfns.co.uk/wild-wild-westminster/",
  "createdAt" : "2017-02-16T07:13:01Z",
  "route" : {
    "createdAt" : "2016-08-29T09:12:33.001Z",
    "url" : "http://www.lfns.co.uk/2017/02/19/route.xml",
    "updatedAt" : "2016-08-29T09:12:33.001Z",
    "segments" : [ {
      "paths" : [ "" ]
    } ]
  },
  "meetingPoint" : {
    "name" : "Serpentine Road",
    "coordinates" : {
      "latitude" : 51.504322,
      "longtitude" : -0.153358
    }
  },
  "leadMarshal" : "Emily",
  "id" : "d290f1ee-6c54-4b01-90e6-d701748f0851",
  "startAt" : "2017-02-19T14:00:00Z",
  "status" : {
    "code" : 2,
    "text" : "GO!"
  },
  "updatedAt" : "2017-02-16T07:13:01Z"
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

