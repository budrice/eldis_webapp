(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('budHeadbar', budHeadbar);
	
	function budHeadbar(){
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			$scope.current_location = window.location.hash === '#!/login/';
			console.log('headbar ' + $scope.current_location);
			$scope.view = (hash)=> {
				window.location.hash = "#/" + hash + "/";
			};
			
		}
		
        return {
            restrict: 'EA',
            scope: {
                headbarCss: '@'
            },
			controller: controller,
            templateUrl: 'blocks/directives/headbar/headbar.html',	
		};
	}
	
})();