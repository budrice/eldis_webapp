(function () {

    'use strict';

    angular.module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope'];
    function HomeController($scope) {
        
        console.log('HOME CONTROLLER');
        
        var userObj = {};
        userObj = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
        console.log(userObj);
        
        init();
        function init() {
            if (userObj === null) {
                console.log('redirecting to login...');
                window.location = '/#/login';
            }
        }
        
    }
})();