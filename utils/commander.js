var rest = require("./rest")
var libxmljs = require("libxmljs");

var options = {
    host: '127.0.0.1',
    port: 5000,
    path: '/2016/04/01/route.xml',
    method: 'GET',
    headers: {
        'Content-Type': 'application/xml'
    }
};

rest.getJSON(options, function(result) {
    var parsedXml = libxmljs.parseXmlString(result);
    var tracks = parsedXml.get("//track");
    console.log(tracks);
});
