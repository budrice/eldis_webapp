(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('breadcrumbs', breadcrumbs);
	
	function breadcrumbs(){
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			
			$scope.view = (hash)=> {
				window.location.hash = "#/" + hash;
			};
			
			$scope.show = true;
			function getHash() {
				let hash = window.location.hash;
				if (hash == '#/login/') {
					$scope.show = false;
				}
				else {
					$scope.show = true;
				}
			}
			
			init();
			function init() {
				getHash();
				$scope.$on('$routeChangeStart', ()=> { 
					getHash();
				});
			}
		}
		
        return {
            restrict: 'EA',
            scope: {
                breadcrumbsCss: '@'
            },
			controller: controller,
            templateUrl: 'blocks/directives/breadcrumbs/breadcrumbs.html',	
		};
	}
	
})();