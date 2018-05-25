let app = require('./app');
let https = require('https');
let http = require('http');
let fs = require('fs');
let cluster = require('cluster');
let config = require('./config/config.json');
let cpus = require('os').cpus().length;

let port = 80;
let secure_port = 443;


let options = {
   pfx: fs.readFileSync(__dirname + '/eldis_webapp.pfx'),
   passphrase: config.passphrase,
   requestCert: false		
};

if (cluster.isMaster) {
    for (let i = 0; i < cpus; i++) {
		cluster.fork();		
	}
    cluster.on('exit', function(worker) {
        console.log('worker ' + worker.process.pid + ' died');
    });
}
else {
    http.createServer().listen(port);
    var server = https.createServer(options, app).listen(secure_port);
    server.on('error', onError);
    server.on('listening', onListening);    
}

/**
* Event listener for HTTP server "error" event.
*/

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    let bind = typeof port === 'string' ? 'Pipe ' + port: 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
* Event listener for HTTP server "listening" event.
*/

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr: 'port ' + addr.port;
    console.log('www.js Listening on ' + bind);
}