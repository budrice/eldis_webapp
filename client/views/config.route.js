(function () {

    'use strict';

    angular.module("app", ["ngRoute", "angularCSS"])
    .config(function($routeProvider) {
        $routeProvider
        .when("/", {
            templateUrl: "views/home/home.html",
            controller: "HomeController",
            css: [{ href: "/views/home/home.css" }]
        })
        .when("/login/", {
            templateUrl: "views/login/login.html",
            controller: "LoginController",
            css: [{ href: "/views/login/login.css" }]
        })
        .when("/directives/", {
            templateUrl: "views/directives/directives.html",
            controller: "DirectivesController",
            css: [{ href: "/views/directives/directives.css" }]
        });
    });
    
})();