(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('budHeadbar', budHeadbar);
	
	function budHeadbar(){
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			
		}
		
        return {
            restrict: 'EA',
            scope: {
                headbarCss: '@',
				headbar: '='
            },
			controller: controller,
            templateUrl: 'blocks/directives/headbar/headbar.html',
			css: [{ href: 'blocks/directives/headbar/headbar.css' }]
		};
	}
	
})();