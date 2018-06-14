(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('budCarousel', budCarousel);
	
	function budCarousel(){
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			$('.carousel').carousel({
			  interval: $scope.interval
			});
		}
		
        return {
            restrict: 'EA',
            scope: {
                carouselArray: '=',
				interval: '=',
				stopInterval: '='
            },
			controller: controller,
            templateUrl: 'blocks/directives/carousel/carousel.html',
			transclude: true,
			css: [{href: 'blocks/directives/carousel/carousel.css'}]
		};
	}
	
})();