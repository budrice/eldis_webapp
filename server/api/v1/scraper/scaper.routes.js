let express = require('express');
let router = express.Router();
let EAscraper = require('./ea.scraper.js');
let ea_scraper = new EAscraper();

router.get('/scraper_ea', (req, res)=> {
    ea_scraper.EA()
    .then((result)=> {
        res.json(result);
    }, (error)=> {
        res.json(error);
    });
});

module.exports = router;