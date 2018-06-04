(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('budNavSidebar', budNavSidebar);
	
	function budNavSidebar(){
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			
			$scope.view = (hash)=> {
				window.location.hash = "#/" + hash;
			};
			
		}
		
        return {
            restrict: 'EA',
            scope: {
                navSidebarContainCss: '@'
            },
			controller: controller,
            templateUrl: 'blocks/directives/navsidebar/nav.sidebar.html',
			css: [{href: 'blocks/directives/navsidebar/navsidebar.css'}]
		};
	}
	
})();