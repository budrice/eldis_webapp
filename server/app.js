var express = require('express');
var fileServer = require('serve-static');
var compress     = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var appDir =  __dirname + '/../client/';
var pkg = require('../package.json');
var API = require('./api/api');
var app = express();

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/favicon.ico'));
app.use(logger('dev'));
app.use(compress()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(fileServer(appDir));
app.use(cors());  

app.enable('trust proxy');

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type, Accept, X-Access-Token, X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.use('/', express.static(pkg.paths.client));
app.use('/appdata/', express.static(pkg.paths.client + '/appdata'));

app.use('/api', API);

module.exports = app;
