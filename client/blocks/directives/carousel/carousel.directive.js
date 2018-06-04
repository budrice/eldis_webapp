(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('budCarousel', budCarousel);
	
	function budCarousel(){
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			let i = 0;
			function next() {
				
				if (i === 1) { $scope.slideshowSplash = false; }
				let length = $("#bud_slideshow_ul li").length;
				if (i < length) {
					let ht = $("#bud_slideshow_ul").height();
					console.log(ht);
					//if (ht < 55) {init();}
					let vht = ht/length;
					let top = i * vht;
					$("#bud_slideshow_slide_frame").css({'margin-top': "-" + top + "px"});
					$("#bud_slideshow_slide").css({'height': vht});
					
					$scope.$apply();
					i = (i == (length - 1) ? 0 : i + 1);
					if (i === 1) { $scope.slideshowSlide = true; }
				}
			}
			
			init();
			function init() {
				angular.element(document).ready(()=> {
					next();
				});
				setInterval(()=> {
					next();
				}, $scope.interval || 3000);
			}
			
		}
		
        return {
            restrict: 'EA',
            scope: {
				slideshowSplash: '=',
				slideShowContainCss: '@',
                carouselArray: '=',
				interval: '=',
				showPanel:'=',
				panelContent: '='
            },
			controller: controller,
            templateUrl: 'blocks/directives/carousel/carousel.html',
			transclude: true,
			css: [{href: 'blocks/directives/carousel/carousel.css'}]
		};
	}
	
})();