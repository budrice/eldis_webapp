let express = require('express');
let router = express.Router();
let Db = require('./database_queries.js');
let db = new Db();

router.post('/login', (req, res)=> {
    db.Login(req.body)
    .then((result)=> {
        console.log(result);
        res.json(result);
    }, (error)=> {
        res.json(error);
    });
});
router.post('/register', (req, res)=> {
    db.Register(req.body)
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
    db.Search(req.params.table, search_object)
    .then((result)=> {
        res.json(result);
    }, (error)=> {
        res.json(error);
    });
});
router.post('/update', (req, res)=> {
    db.Update(req.body.table, req.body.id, req.body.update_object)
    .then((result)=> {
        res.json(result);
    }, (error)=> {
        res.json(error);
    });
});

module.exports = router;