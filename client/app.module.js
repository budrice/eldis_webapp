(function () {
    
    'use strict';
    
    var app = angular.module('app', [
        'ngAnimate', 'ngRoute', 'ngSanitize', 'ui.bootstrap', 'angularCSS'
    ]);
    app.config(['$locationProvider', ($locationProvider)=> {
        $locationProvider.hashPrefix('');
    }])
    .run(()=> {
        String.prototype.firstUpper = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        };
    });
    
})();