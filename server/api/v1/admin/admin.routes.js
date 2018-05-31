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
database.on('error', (error)=> {
    console.log(error);
});

// auth.js -------------------------------------------------------------------
var auth = require('./auth.js')(database);
router.post('/login', (req, res)=> {
    auth.Login(req.body)
    .then((result)=> {
        console.log(result);
        res.json(result);
    }, (error)=> {
        res.json(error);
    });
});
router.post('/register', (req, res)=> {
    auth.Register(req.body)
    .then((result)=> {
        res.json(result);
    }, (error)=> {
        res.json(error);
    });
});
router.get('/getusername/:username', (req, res)=> {
    auth.GetUsername(req.params.username)
    .then((result)=> {
        res.json(result);
    }, (error)=> {
        res.json(error);
    });
});
router.get('/getemailaddress/:email_address', (req, res)=> {
    console.log(req.params.email_address);
    auth.GetEmailAddress(req.params.email_address)
    .then((result)=> {
        res.json(result);
    }, (error)=> {
        res.json(error);
    });
});

module.exports = router;