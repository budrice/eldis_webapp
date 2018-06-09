(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('budNavbar', budNavbar);
	
	function budNavbar(){
		
		controller.$inject = ['$scope', '$location'];
		function controller($scope, $location) {
			
			let userObj = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
			$scope.links = [];
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
				console.log(next);
				if (next) {
					userObj = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
					
					userObj = (userObj === null) ? { bread : [] } : userObj;
					console.log(userObj.bread);
					setTimeout(()=> {
						$scope.links = userObj.bread;
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
			css: [{ href: 'blocks/directives/navbar/navbar.css' }]
		};
	}
	
})();