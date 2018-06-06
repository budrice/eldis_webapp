(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('budNavSidebar', budNavSidebar);
	
	function budNavSidebar(){
		
		controller.$inject = ['$scope', '$location'];
		function controller($scope, $location) {
			
			$scope.view = (hash)=> {
				$location.path('/' + hash + '/');
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