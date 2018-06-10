(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('budNavSidebar', budNavSidebar);
	
	function budNavSidebar(){
		
		controller.$inject = ['$scope', '$location'];
		function controller($scope, $location) {
			$scope.sidebars = [];
			$scope.css = {};
			
			
			let array = [];
			$scope.sidebars = angular.copy(array.getDefaultNavLinks());
			$scope.css = angular.copy(array.navStyle()[0]);
			
			$scope.view = (hash)=> {
				$location.path('/' + hash + '/');
			};
			
			$scope.$watch('bsgridClass', (event, value)=> {
				$scope.bsgrid = value;
			});
			
		}
		
        return {
            restrict: 'EA',
            scope: {
                bsgridClass: '@'
            },
			controller: controller,
            templateUrl: 'blocks/directives/navsidebar/nav.sidebar.html',
			css: [{ href: 'blocks/directives/navsidebar/nav.sidebar.css' }]
		};
	}
	
})();