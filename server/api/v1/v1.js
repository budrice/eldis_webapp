var express = require('express');
var router = express.Router();

var db_routes  = require('./database/database.routes.js');
var emailer_routes  = require('./emailer/emailer.routes.js');

router.use('/database', db_routes);
router.use('/email', emailer_routes);

module.exports = router;