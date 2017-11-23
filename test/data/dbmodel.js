"use strict";

const skatingEvent = {
  title: "Sunday Stroll: For Wander-its-worth",
  description: "This Sunday our star quaddie lead marshal Kev will be taking the Sunday Stroll on a wonderful wander down to Wandsworth. Hopefully the temperatures and join us with music, wheels and a willingness to have a good time!!",
  startAt: "2017-05-07 13:00:00 UTC",
  meetingPoint: {
   name: "East end of Serpentine Road",
   coordinates: {
     latitude: 51.504322,
     longitude: 0.153358
   }
  },
  halfTime: {
   name: "Wandsworth Bridge",
   coordinates: {
     latitude: 51.468164805146166,
     longitude: -0.19050121307373047
   }
  },
  distance: 8,
  leadMarshal: "Kev",
  status: {
   code: 1,
   text: "Pending"
  },
  url: "http://www.lfns.co.uk/for-wander-its-worth/",
  route: {
   url: "http://www.lfns.co.uk/2017/05/07/route.xml"
  }
}

module.exports.skatingEventModel = skatingEvent;
