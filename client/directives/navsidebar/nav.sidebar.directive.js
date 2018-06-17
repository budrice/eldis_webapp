(function() {
	
	'use strict';
	
	angular.module('app').directive('budNavSidebar', budNavSidebar);
	
	function budNavSidebar(){
		
		controller.$inject = ['$scope', '$location', '$window'];
		function controller($scope, $location, $window) {
			
			let user_object = {};
			$scope.sidebars = [];
			let array = [];
			$scope.sidebars = angular.copy(array.getDefaultNavLinks());
			
			// hide if login
			if (window.location.hash === '#/login/') {
				$scope.current_location = true;
			}
			else {
				$scope.current_location = false;
			}
			
			/**
			 * view
			 * @param {String} hash
			 */
			$scope.view = (hash)=> {
				$location.path('/' + hash + '/');
			};
			
			/**
			 * logout
			 */
			$scope.logout = ()=> {
				sessionStorage.removeItem('USER_OBJ');
				$window.location.reload();
			};
			
			// 
			$scope.$on('$routeChangeStart', function($event, next) {
				if (next) {
					//getUsername();
					setTimeout(()=> {
						$scope.current_location = window.location.hash === '#/login/';
						$scope.$digest();
					}, 0);
				}
			});
			
			function getUsername() {
				user_object = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
				if (user_object !== null) {
					if (user_object.data) {
						setTimeout(()=> {
							$scope.username = user_object.data.username;
							$scope.$digest();
						}, 0);
					}
				}
			}
			
			init();
			function init() {
				getUsername();
			}
			
		}
		
        return {
            restrict: 'EA',
			transclude: true,
            scope: {
				navTitle: '@',
				navbarIcon: '@',
				navbarIconAlt: '@'
            },
			controller: controller,
            templateUrl: 'directives/navsidebar/nav.sidebar.html',
			css: [{ href: 'directives/navsidebar/nav.sidebar.css' }]
		};
	}
	
})();