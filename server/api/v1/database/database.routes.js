let express = require('express');
let router = express.Router();
let Query = require('./database_queries.js');
let query = new Query();

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
    if (req.params.key !== null) {
        search_object[req.params.key] = req.params.value;
    }
    query.BasicSearch(req.params.table, search_object)
    .then((result)=> {
        res.json(result);
    }, (error)=> {
        res.json(error);
    });
});
router.post('/update', (req, res)=> {
    query.Update(req.body.table, req.body.update)
    .then((result)=> {
        res.json(result);
    }, (error)=> {
        res.json(error);
    });
});

module.exports = router;