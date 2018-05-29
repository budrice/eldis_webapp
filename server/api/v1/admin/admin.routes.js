var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./../../../config/config.json');

var database = mysql.createPool({
    connectionLimit: config.connectionLimit,
    connectTimeout: config.connectTimeout,
    multipleStatements: config.multipleStatements,
    host: config.dbServerIP,
    user: config.dbUser,
    password: config.dbPass,
    database: config.db
});
database.on('error', function(error) {
    console.log(error);
});

// auth.js -------------------------------------------------------------------
var auth = require('./auth.js')(database);
router.post('/login', function(req, res) {
    auth.Login(req.body).then((result)=> {
        res.json(result);
    }, (error)=> {
        res.json(error);
    });
});
router.post('/register', function(req, res) {
    auth.Register(req.body).then((result)=> {
        res.json(result);
    }, (error)=> {
        res.json(error);
    });
});

module.exports = router;