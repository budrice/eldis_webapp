var express = require('express');
var router = express.Router();

var db_routes  = require('./database/database.routes.js');

router.use('/database', db_routes);

module.exports = router;