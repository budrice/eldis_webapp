(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('navbar', navbar);
	
	function navbar(){
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			
			console.log('navbar');
			
			init();
			function init() {
				
			}
		}
		
        return {
            restrict: 'EA',
            scope: {
                
            },
            controller: controller,
            templateUrl: 'blocks/directives/navbar/navbar.html',	
		};
	}
	
})();