(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('budBreadcrumbs', budBreadcrumbs);
	
	function budBreadcrumbs(){
		
		controller.$inject = ['$scope', '$location'];
		function controller($scope, $location) {
			let userObj = JSON.parse(window.sessionStorage.getItem('USER_OBJ')) || {};
			// boolean to hide breadcrumbs @ login
			//$scope.current_location = window.location.hash === '#/login/';
			//$scope.bread = [{
			//	hash: 'login',
			//}];
			$scope.view = (hash)=> {
				$location.path ('/' + hash + '/');
			};
			
			function updateCrumbs(hash_str) {
				if (hash_str == 'login') {
					setTimeout(()=> {
						$scope.bread = [{
							hash: 'login',
						}];
						$scope.current_location = true;
						userObj.bread = $scope.bread;
						window.sessionStorage.setItem('USER_OBJ', JSON.stringify(userObj));
						$scope.$digest();
					}, 0);
					
				}
				else {
					if (hash_str === '') { hash_str = 'home/'; }
					let pos = $scope.bread.map(function(e) { return e.hash; }).indexOf(hash_str);
					setTimeout(()=> {
						if (pos >= 0) {
							$scope.bread.length = (pos + 1);
							console.log($scope.bread);
						}
						else {
							$scope.bread.push({
								hash: hash_str
							});
						}
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
				console.log('init');
				console.log(window.location.hash);
				if (Object.keys(userObj) > 0) {
					if (window.location.hash === '#/login/') {
						updateCrumbs('login');
					}
					else {
						getBreadcrumbs();
					}
				}
				else {
					updateCrumbs('login');
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