(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('navbar', navbar);
	
	function navbar(){
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			$scope.user = {};
			$scope.nav_buttons = false;
			
			$scope.view = (hash)=> {
				window.location.hash = "#/" + hash;
			};
			
			$scope.logout = ()=> {
				console.log('log out');
				window.sessionStorage.removeItem("USER_OBJ");
				window.location.hash = "#/login/";
			};
			
			function getLoginInformation() {
				
			}
			
			function getHash() {
				let view = window.location.hash;
				if (view == '#/login/') {
					$scope.nav_buttons = false;
				}
				else {
					$scope.nav_buttons = true;
				}
			}
			
			init();
			function init() {
				getHash();
				$scope.$on('$routeChangeStart', ()=> { 
					getHash();
					getLoginInformation();
				});
				
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