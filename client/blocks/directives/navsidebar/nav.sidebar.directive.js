(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('budNavSidebar', budNavSidebar);
	
	function budNavSidebar(){
		
		controller.$inject = ['$scope', '$location', '$window'];
		function controller($scope, $location, $window) {
			
			let user_object = {};
			
			$scope.sidebars = [];
			
			let array = [];
			$scope.sidebars = angular.copy(array.getDefaultNavLinks());
			
			if (window.location.hash === '#/login/') {
				$scope.current_location = true;
			}
			else {
				$scope.current_location = false;
			}
			
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
			
			$scope.$watch('bsgridClass', (event, value)=> {
				$scope.bsgrid = value;
			});
			
			$scope.$on('$routeChangeStart', function($event, next) {
				console.log('$routeChangeStart');
				if (next) {
					getUsername();
					console.log($scope.username);
					setTimeout(()=> {
						$scope.current_location = window.location.hash === '#/login/';
						$scope.$digest();
					}, 0);
				}
			});
			
			function getUsername() {
				user_object = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
				console.log(user_object);
				if (user_object !== null) {
					if (user_object.data) {
						setTimeout(()=> {
							console.log(user_object.data.username);
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
				navbarIconAlt: '@',
                bsgridClass: '@'
            },
			controller: controller,
            templateUrl: 'blocks/directives/navsidebar/nav.sidebar.html',
			css: [{ href: 'blocks/directives/navsidebar/nav.sidebar.css' }]
		};
	}
	
})();