(function () {
    
    'use strict';
    
    var bud_app = angular.module('app', [
        'ngAnimate', 'ngRoute', 'ngSanitize', 'ui.bootstrap', 'angularCSS'
    ]);
    bud_app.config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);
    
})();