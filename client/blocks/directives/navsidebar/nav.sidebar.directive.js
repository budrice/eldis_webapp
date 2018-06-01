(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('navSidebar', navSidebar);
	
	function navSidebar(){
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			
			$scope.view = (hash)=> {
				window.location.hash = "#/" + hash;
			};
			
		}
		
        return {
            restrict: 'EA',
            scope: {
                navSidebarCss: '@'
            },
			controller: controller,
            templateUrl: 'blocks/directives/navsidebar/nav.sidebar.html',	
		};
	}
	
})();