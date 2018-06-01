(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('headbar', headbar);
	
	function headbar(){
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			
			$scope.view = (hash)=> {
				window.location.hash = "#/" + hash + "/";
			};
			
			function getHash() {
				let hash = window.location.hash;
				console.log(hash);
				if (hash == '#/login/') {
					$scope.show = false;
				}
				else {
					$scope.show = true;
				}
			}
			
			init();
			function init() {
				getHash();
				$scope.$watch('onLocationChanged', ()=> {
					getHash();
				});
			}
			
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