(function () {
	
    'use strict';
    
    angular
	.module('app.core')
	.factory('DateTimeService', DateTimeService);

    DateTimeService.$inject = [];
    function DateTimeService() {
    	let service = {
    		GetRightNowMysql: function(){
		    	return new Date().toISOString().slice(0, 19).replace('T',' ');
    		},
    		DateToMysql: function(arg_date){
    			return arg_date.toISOString().slice(0, 19).replace('T',' ');
    		}
		};
		return service;
	}
})();