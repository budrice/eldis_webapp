(function () {

    'use strict';

    angular.module("app", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl: "views/home/home.html",
            controller: "HomeController",
            css: "views/home/home.css"
        })
        .when("/login/", {
            templateUrl: "views/login/login.html",
            controller: "LoginController",
            css: "views/login/login.css"
        })
        .when("/directives/", {
            templateUrl: "views/directives/directives.html",
            controller: "DirectivesController",
            css: "views/directives/directives.css"
        });
    });
    
})();