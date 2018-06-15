(function () {

    'use strict';

    angular.module("app")
    .config(($routeProvider)=> {
        $routeProvider
        .when("/admin/", {
            templateUrl: "views/admin/admin.html",
            controller: "AdminController",
            css: [{ href: "/views/admin/admin.css" }]
        })
        .when("/login/", {
            templateUrl: "views/login/login.html",
            controller: "LoginController",
            css: [{ href: "/views/login/login.css" }]
        })
        .when("/about/", {
            templateUrl: "views/about/about.html",
            controller: "AboutController",
            css: [{ href: "views/about/about.css" }]
        })
        .when("/technologies/", {
            templateUrl: "views/technologies/technologies.html",
            controller: 'TechnologiesController',
            css: [{ href: 'views/technologies/technologies.css' }]
        })
        .when("/contact/", {
            templateUrl: "views/contact/contact.html",
            controller: 'ContactController',
            css: [{ href: 'views/contact/contact.css' }]
        })
        .when("/home/", {
            templateUrl: "views/home/home.html",
            controller: "HomeController",
            css: [{ href: "/views/home/home.css" }]
        })
        .when("/", {
            templateUrl: "views/home/home.html",
            controller: "HomeController",
            css: [{ href: "/views/home/home.css" }]
        });
        
    });
    
})();