var express = require('express');
var router = express.Router();
var Query = require('./database_queries.js');
var query = new Query();

router.post('/login', (req, res)=> {
    console.log('@route');
    query.Login(req.body)
    .then((result)=> {
        console.log(result);
        res.json(result);
    }, (error)=> {
        res.json(error);
    });
});
router.post('/register', (req, res)=> {
    query.Register(req.body)
    .then((result)=> {
        res.json(result);
    }, (error)=> {
        res.json(error);
    });
});
router.get('/basicsearch/:table/:key/:value', (req, res)=> {
    let search_object = {};
    search_object[req.params.key] = req.params.value;
    query.BasicSearch(req.params.table, search_object)
    .then((result)=> {
        res.json(result);
    }, (error)=> {
        res.json(error);
    });
});

module.exports = router;