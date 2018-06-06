(function () {
    
    'use strict';
    
    var app = angular.module('app', [
        'ngAnimate', 'ngRoute', 'ngSanitize', 'ui.bootstrap', 'angularCSS'
    ]);
    app.config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
    
})();