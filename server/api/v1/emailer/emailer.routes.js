let express = require('express');
let router = express.Router();
let Email = require('./emailer.js');
let email = new Email();

router.post('/send', (req, res)=> {
    email.Send(req.body)
    .then((result)=> {
        res.json(result);
    }, (error)=> {
        res.json(error);
    });
});

module.exports = router;