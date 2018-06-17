(function() {
	
	'use strict';
	
	angular.module('app').directive('budBreadcrumbs', budBreadcrumbs);
	
	function budBreadcrumbs(){
		
		controller.$inject = ['$scope', '$location'];
		function controller($scope, $location) {
			
			$scope.bread = [];
			
			let user_object = {};
			user_object = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
			
			/**
			 * view
			 * @param {String} hash
			 */
			$scope.view = (hash)=> {
				$location.path ('/' + hash + '/');
			};
			
			/**
			 * updateCrumbs
			 * @param {String} hash_str
			 */
			function updateCrumbs(hash_str) {
				user_object = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
				if (hash_str == 'login') {
					if (user_object !== null) {
						setTimeout(()=> {
							user_object.bread = [];
							window.sessionStorage.setItem('USER_OBJ', JSON.stringify(user_object));
							$scope.$digest();
						}, 0);
					}
					$scope.bread = [];
				}
				else {
					hash_str = (hash_str === '') ? hash_str = 'home' : hash_str;
					let pos = $scope.bread.map((e)=> { return e.hash; }).indexOf(hash_str);
					setTimeout(()=> {
						if (pos >= 0) {
							$scope.bread.length = (pos + 1);
						}
						else {
							$scope.bread.push({
								hash: hash_str,
								label: hash_str.charAt(0).toUpperCase() + hash_str.slice(1)
							});
							$scope.$digest();
						}
						user_object.bread = [];
						user_object.bread = $scope.bread;
						window.sessionStorage.setItem('USER_OBJ', JSON.stringify(user_object));
						$scope.$digest();
					}, 0);
				}
			}
			
			/**
			 * getBreadcrumbs
			 */
			function getBreadcrumbs() {
				$scope.bread = user_object.bread;
			}
			
			// event handler to get hash from route
			$scope.$on('$routeChangeStart', function($event, next) {
				if (next) {
					let len = next.$$route.originalPath.length;
					let hash = next.$$route.originalPath.slice(1, (len -1));
					updateCrumbs(hash);
				}
			});
			
			init();
			function init() {
				if (window.location.hash === '#/login/') {
					updateCrumbs('login');
				}
				else {
					getBreadcrumbs();
				}
			}
		}
		
        return {
            restrict: 'EA',
            scope: {
                breadcrumbsCss: '@',
				pageChangeEvent: '='
            },
			controller: controller,
            templateUrl: 'directives/breadcrumbs/breadcrumbs.html',
			css: [{ href: 'directives/breadcrumbs/breadcrumbs.css' }]
		};
	}
	
})();