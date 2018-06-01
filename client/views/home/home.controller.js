(function () {

    'use strict';

    angular.module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'msgbox'];
    function HomeController($scope, msgbox) {
        
        var userObj = {};
        userObj = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
        
        init();
        function init() {
            if (userObj === null) {
                msgbox.info('redirecting to login...');
                window.location = '/#/login';
            }
        }
        
    }
})();