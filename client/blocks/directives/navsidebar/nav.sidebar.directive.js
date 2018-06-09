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
			
			$scope.sidebars = [{
				hash: 'home',
				label: 'Home'
			},
			{
				hash: 'about',
				label: 'About'
			},
			{
				hash: 'technologies',
				label: 'Technologies'
			},
			{
				hash: 'contact',
				label: 'Contact'
			}];
			
			$scope.css = {
				backcolor: '#003e6d',
				backhover: '#003e6d',
				charcolor: '#fff',
				charhover: '#00ffff'
			};
			
			$scope.$watch('bsgridClass', (event, value)=> {
				$scope.bsgrid = value;
			});
			
		}
		
        return {
            restrict: 'EA',
            scope: {
                bsgridClass: '@'
            },
			controller: controller,
            templateUrl: 'blocks/directives/navsidebar/nav.sidebar.html',
			css: [{ href: 'blocks/directives/navsidebar/nav.sidebar.css' }]
		};
	}
	
})();