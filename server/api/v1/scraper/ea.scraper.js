var request = require('request');
var cheerio = require('cheerio');

var EA_BASE_URL = 'https://www.ea.com/news';

request = request.defaults({ jar: true });

module.exports = function() {
	return {
		EA: ea
	};
	
	function ea() {
		
	}
};
// private  functions