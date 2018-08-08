var http = require('http');
var ecstatic = require('ecstatic');
var yArgs = require('yargs');
var port = yArgs.argv.p || 8000;

http.createServer(ecstatic({
    root: __dirname
})).listen(port);
console.log('serve ' + __dirname + ' on :' + port);