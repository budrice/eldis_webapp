(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('navbar', navbar);
	
	function navbar(){
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			$scope.user = {};
			function getLoginInformation() {
				
			}
			
			init();
			function init() {
				getLoginInformation();
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