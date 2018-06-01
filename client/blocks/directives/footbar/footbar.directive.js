(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('footbar', footbar);
	
	function footbar(){
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			
			init();
			function init() {
				
			}
			
		}
		
        return {
            restrict: 'EA',
            scope: {
                
            },
            controller: controller,
            templateUrl: 'blocks/directives/footbar/footbar.html',
			css: 'blocks/directives/footbar/footbar.css'
		};
	}
	
})();