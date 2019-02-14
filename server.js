var express = require('express');

var opener = require('opener');

var server = express();
server.use(express.static(__dirname));

var port = 7777;
server.listen(port, function () {
	console.log("--------------------------------------------------------");
	console.log('Server listening on port ' + port);
	console.log('Stop the server by entering CTRL+C in the command prompt.');
	console.log("--------------------------------------------------------");
});

opener('http://localhost:7777/index.html');