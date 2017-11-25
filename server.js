'use strict';

let express = require('express');
let app = express();
let routes = require('./routes');
let jsonParser = require('body-parser').json;

app.use(jsonParser());

require('./database');

app.use('/api', routes);


app.use(function(req, res, next) {
    let err = new Error('Not found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
});

let port = process.env.PORT || 6633;

app.listen(port, function() {
    console.log('Express server is listening on port ', port);
});
