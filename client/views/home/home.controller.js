(function () {

    'use strict';

    angular.module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'msgbox', '$location', '$window'];
    function HomeController($scope, msgbox, $location, $window) {
        
        var userObj = {};
        userObj = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
        
        

        
        
        init();
        function init() {
            if (userObj === null) {
                msgbox.info('redirecting to login...');
				$location.path('/login/');
				$window.location.reload();
            }
        }
        
    }
})();