'use strict';

const skatingEvents = [
    {
        _id: '590e54895dd9d404004d5c3c',
        title: 'Sunday Stroll: For Wander-its-worth',
        description: 'This Sunday our star quaddie lead marshal Kev will be taking the Sunday Stroll on a wonderful wander down to Wandsworth. Hopefully the temperatures and join us with music, wheels and a willingness to have a good time!!',
        startAt: '2017-05-07T13:00:00.000Z',
        meetingPoint: {
            name: 'East end of Serpentine Road',
            coordinates: {
                latitude: 51.504322,
                longitude: 0.153358
            }
        },
        halfTime: {
            name: 'Wandsworth Bridge',
            coordinates: {
                latitude: 51.468164805146166,
                longitude: -0.19050121307373047
            }
        },
        distance: 8,
        leadMarshal: 'Kev',
        status: {
            code: 1,
            text: 'Pending'
        },
        url: 'http://www.lfns.co.uk/for-wander-its-worth/',
        route: {
            url: 'http://www.lfns.co.uk/2017/05/07/route.xml',
            updatedAt: '2017-05-06T22:56:09.803Z',
        },
        updatedAt: '2017-05-06T22:56:09.803Z',
        createdAt: '2017-05-06T22:56:09.803Z'
    },
    {
        '_id':'59f99b3db2f6d431d7a346d6',
        'startAt':'2017-11-05T14:00:00.000Z',
        'route':{
            'url':'http://www.lfns.co.uk/2017/11/05/route.xml',
            'updatedAt':'2017-11-05T16:30:28.356Z',
            'createdAt':'2017-11-05T16:30:28.356Z'
        },
        'url':'http://www.lfns.co.uk/deja-vu-bullwinkle/',
        'leadMarshal':'Kev',
        'distance':9.1,
        'description': 'Deja vu when you think you have been here before and yes you were probably right.Click here for full screen map',
        'title':'Sunday Stroll: deja vu Bullwinkle',
        'updatedAt':'2017-11-05T16:30:28.355Z',
        'createdAt':'2017-11-05T16:30:28.355Z',
        'status': {
            'text':'Completed',
            'code':3
        },
        'halfTime':{
            'name':'Gloucester road tube',
            'coordinates':{
                'longitude':-0.18239825963974,
                'latitude':51.4942003840432
            }
        },
        'meetingPoint':{
            'name':'East end of Serpentine Road',
            'coordinates':{
                'longitude':-0.153358,
                'latitude':51.504322
            }
        }
    }
];

module.exports.skatingEventModelList = skatingEvents;
