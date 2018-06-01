(function () {

    'use strict';

    angular.module("app", ["ngRoute", "angularCSS"])
    .config(function($routeProvider) {
        $routeProvider
        .when("/login/", {
            templateUrl: "views/login/login.html",
            controller: "LoginController",
            css: [{ href: "/views/login/login.css" }]
        })
        .when("/about/", {
            templateUrl: "views/404.html"
        })
        .when("/services/", {
            templateUrl: "views/404.html"
        })
        .when("/contact/", {
            templateUrl: "views/404.html"
        })
        .when("/pricing/", {
            templateUrl: "views/404.html"
        })
        .when("/", {
            templateUrl: "views/home/home.html",
            controller: "HomeController",
            css: [{ href: "/views/home/home.css" }]
        });
    });
    
})();