'use strict';

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://database:27017/event-listings',
    { useMongoClient: true });

var db = mongoose.connection;
db.on('error', function(err) {
    console.error('connection error:', err);
});

db.once('open', function() {
    console.log('db connection successful');
});
