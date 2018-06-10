(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('budBreadcrumbs', budBreadcrumbs);
	
	function budBreadcrumbs(){
		
		controller.$inject = ['$scope', '$location'];
		function controller($scope, $location) {
			
			$scope.bread = [];
			
			let userObj = {};
			
			userObj = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
			
			$scope.view = (hash)=> {
				$location.path ('/' + hash + '/');
			};
			
			function updateCrumbs(hash_str) {
				if (hash_str == 'login') {
					setTimeout(()=> {
						$scope.bread = [{
							hash: 'login',
							label: 'Login'
						}];
						$scope.current_location = true;
						userObj = (userObj === null) ? {}: userObj;
						userObj.bread = [];
						userObj.bread = $scope.bread;
						window.sessionStorage.setItem('USER_OBJ', JSON.stringify(userObj));
						$scope.$digest();
					}, 0);
				}
				else {
					if (hash_str === '') { hash_str = 'home'; }
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
						userObj = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
						userObj.bread = [];
						userObj.bread = $scope.bread;
						window.sessionStorage.setItem('USER_OBJ', JSON.stringify(userObj));
						$scope.current_location = false;
						$scope.$digest();
					}, 0);
				}
			}
			
			function getBreadcrumbs() {
				$scope.bread = userObj.bread;
			}
			
			$scope.$on('$routeChangeStart', function($event, next) {
				if (next) {
					let len = next.$$route.originalPath.length;
					let hash = next.$$route.originalPath.slice(1, (len -1));
					updateCrumbs(hash);
					$scope.view(hash);
				}
			});
			
			init();
			function init() {
				if (userObj) {
					if (Object.keys(userObj) > 0) {
						if (window.location.hash === '#/login/') {
							updateCrumbs('login');
						}
						else {
							getBreadcrumbs();
						}
					}
					else {
						if (window.location.hash === '#/login/') {
							updateCrumbs('login');
						}
						else {
							$scope.current_location = false;
							getBreadcrumbs();
						}
					}
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
            templateUrl: 'blocks/directives/breadcrumbs/breadcrumbs.html',
			css: [{ href: 'blocks/directives/breadcrumbs/breadcrumbs.css' }]
		};
	}
	
})();