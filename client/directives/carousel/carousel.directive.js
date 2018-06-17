(function() {
	
	'use strict';
	
	angular.module('app').directive('budCarousel', budCarousel);
	function budCarousel(){
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			// set interval
			$('.carousel').carousel({
			  interval: $scope.interval
			});
		}
		
        return {
            restrict: 'EA',
            scope: {
                carouselArray: '=',
				interval: '='
            },
			controller: controller,
            templateUrl: 'directives/carousel/carousel.html',
			css: [{href: 'directives/carousel/carousel.css'}]
		};
	}
	
})();