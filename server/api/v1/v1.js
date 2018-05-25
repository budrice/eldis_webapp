var express = require('express');
var router = express.Router();

var adminRoutes 			= require('./admin/admin.routes.js');

router.use('/admin', adminRoutes);

module.exports = router;