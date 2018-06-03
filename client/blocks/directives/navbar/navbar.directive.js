(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('budNavbar', budNavbar);
	
	function budNavbar(){
		
		controller.$inject = ['$scope', '$location', '$window'];
		function controller($scope, $location, $window) {
			$scope.user = {};
			console.log('window.location.hash');
			console.log(window.location.hash);
			$scope.current_location = $location.hash === '#!/login/';
			console.log('navbar ' + $scope.current_location);
			$scope.view = (hash)=> {
				console.log(hash);
				$location.path("/" + hash + "/");
			};
			
			$scope.logout = ()=> {
				console.log('log out');
				window.sessionStorage.removeItem("USER_OBJ");
				$location.path('/login/');
				$window.location.reload();
			};
			
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