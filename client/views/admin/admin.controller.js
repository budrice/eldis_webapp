(function () {

    'use strict';

    angular.module('app')
	.controller('AdminController', AdminController);

    AdminController.$inject = ['$scope', 'msgbox', '$location'];
    function AdminController($scope, msgbox, $location) {
        
        var userObj = {};
        userObj = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
		
		
		
		
		init();
        function init() {
			console.log(userObj);
            if (userObj !== null) {
				if (userObj.token) {
					// do check of token
				}
				else {
					msgbox.info('redirecting to login...');
					$location.path('/login/');
				}
            }
			else {
				msgbox.info('redirecting to login...');
				$location.path('/login/');
			}
        }
        
    }
})();