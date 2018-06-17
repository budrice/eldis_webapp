(function() {
	
	'use strict';
	
	angular.module('app').directive('budHeadbar', budHeadbar);
	
	function budHeadbar(){
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			$scope.current_location = window.location.hash === '#/login/';
			$scope.$on('$routeChangeStart', function($event, next) {
				if (next) {
					setTimeout(()=> {
						// hide if login
						$scope.current_location = window.location.hash === '#/login/';
						$scope.$digest();
					}, 0);
				}
			});
		}
		
        return {
            restrict: 'EA',
            scope: {
                headbarCss: '@',
				headbar: '='
            },
			controller: controller,
            templateUrl: 'directives/headbar/headbar.html',
			css: [{ href: 'directives/headbar/headbar.css' }]
		};
	}
	
})();