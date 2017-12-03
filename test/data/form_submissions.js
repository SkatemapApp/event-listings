'use strict';

const sunday_stroll = {
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

// halftime_lat & halftime_lon left out intentionally
const friday_night = {
    id: '20171201',
    name: 'LFNS: Clapham Cannonball Run',
    description: 'Hello y\'all! Getting ready for Santa? Well he ain’t out yet!First we are off to the Clapham Cannonball Run, where we cruise through 14 miles around London on smooth surfaces. We have ups. We have downs. We have long straights. We have awesome fun.Prepare yourself to make some room for that holiday food,this one might wear you out a bit. but it will be worth it!Click here for full screen map',
    start: '2017-12-01 20:00:00 UTC',
    meet: 'Wellington Arch',
    distance: 14,
    status: 'Rained Off',
    meet_lat: 51.502533,
    meet_lon: -0.150913,
    halftime: 'Clapham Common',
    marshal: 'Carl',
    status_code: 4,
    url: 'http://www.lfns.co.uk/clapham-cannonball-run-3/',
    url_route: 'http://www.lfns.co.uk/2017/12/01/route.xml'
};

module.exports.sunday_stroll = sunday_stroll;
module.exports.friday_night = friday_night;
