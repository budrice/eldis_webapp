(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('budBreadcrumbs', budBreadcrumbs);
	
	function budBreadcrumbs(){
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			$scope.current_location = window.location.hash === '#!/login/';
			console.log('breadcrumbs ' + $scope.current_location);
			$scope.view = (hash)=> {
				window.location.hash = "#/" + hash;
			};
			
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