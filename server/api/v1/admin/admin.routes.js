var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var jwt = require('jwt-simple');
var config = require('./../../../config/config.json');

var database = mysql.createPool({
    connectionLimit: 10,
    connectTimeout: 20000,
    multipleStatements: true,
    host: config.dbServerIP,
    user: config.dbUser,
    password: config.dbPass,
    database: 'eldis_webapp'
});
database.on('error', function(error) {
    console.log(error);
});

// auth.js -------------------------------------------------------------------
var auth = require('./auth.js')(database);
router.post('/login', function(req, res) {
    auth.login(req.body, function(result) {
        res.json(result);
    });
});
router.post('/register', function(req, res) {
    auth.register(req.body, function(result) {
        res.json(result);
    });
});
router.get('/apps/:uid', function(req, res) {
    var token = req.get('x-access-token');
    if (ValidateToken(token)){
        var uid = req.params.uid;
        auth.getUserApps(uid, function(result) {
            res.json(result);
        });
    }
    else {
        res.json({
          "id": 3000,
          "message": "Invalid Token"
        });
    }
    
});

function ValidateToken(token){
    try{
        var decoded = jwt.decode(token, require('../../../config/secret.js')());
        if (decoded.exp <= Date.now()) {
            return false;
        }
        else {
            return true;
        }
    }
    catch (err){
        return false;
    }
        
}

module.exports = router;