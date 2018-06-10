(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('budNavSidebar', budNavSidebar);
	
	function budNavSidebar(){
		
		controller.$inject = ['$scope', '$location'];
		function controller($scope, $location) {
			$scope.sidebars = {};
			$scope.sidebars.nav_array = [];
			$scope.css = {};
			
			
			setTimeout(()=> {
				let array = [];
				let object = {};
				$scope.sidebars.nav_array = angular.copy(array.getDefaultNavLinks());
				$scope.css = angular.copy(object.navStyle());
				console.log($scope.css);
				$scope.$apply();
			}, 0);
			//
			//$scope.css.navStyle();
			//let buddy = 'buddy';
			
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