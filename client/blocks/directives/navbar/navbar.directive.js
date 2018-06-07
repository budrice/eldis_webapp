(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('budNavbar', budNavbar);
	
	function budNavbar(){
		
		controller.$inject = ['$scope', '$location'];
		function controller($scope, $location) {
			
			$scope.user = {};
			// boolean to hide if on page login
			$scope.current_location = window.location.hash === '#/login/';
			
			/**
			 * view
			 * @param {String} hash
			 */
			$scope.view = (hash)=> {
				$location.path("/" + hash + "/");
			};
			
			/**
			 * logout
			 */
			$scope.logout = ()=> {
				window.sessionStorage.removeItem("USER_OBJ");
				$location.path('/login/');
			};
			
			$scope.$on('$routeChangeStart', function($event, next) {
				if (next) {
					$scope.current_location = window.location.hash === '#/login/';
					setTimeout(()=> {
						$scope.current_location = window.location.hash === '#/login/';
						$scope.$digest();
					}, 0);
				}
			});
			
		}
		
        return {
            restrict: 'EA',
            scope: {
                
            },
            controller: controller,
            templateUrl: 'blocks/directives/navbar/navbar.html',
			css: [{ href: 'blocks/directives/navbar/navbar.css'}]
		};
	}
	
})();