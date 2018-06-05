(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('budCarousel', budCarousel);
	
	function budCarousel(){
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			
			let i = 0;// picture index
			/**
			 * next
			 * carousel slide change function to next indice
			 */
			function next() {
				if (i === 1) {
					$scope.slideshowSlide = true;// show slideshow
					$scope.slideshowSplash = false;// remove dummy cover
					$scope.$digest();
				}
				let length = $("#bud_slideshow_ul li").length;// length of the array
				if (i < length) {
					let ht = $("#bud_slideshow_ul").height();// height of the picture array stack
					let vht = ht/length;
					let top = i * vht;
					$("#bud_slideshow_slide_frame").css({'margin-top': "-" + top + "px"});// margin to next picture
					$("#bud_slideshow_slide").css({'height': vht});// adjust view to window
					$scope.$digest();
					i = (i == (length - 1) ? 0 : i + 1);// resets i when array ends
				}
			}
			
			init();
			function init() {
				// on load start carousel
				angular.element(document).ready(()=> {
					next();
				});
				// run carousel
				setInterval(()=> {
					next();
				}, $scope.interval || 3000);
				// end carousel on demand from parent
				$scope.$watch('stopInterval', (event, value)=> {
					if (value) {
						clearInterval(carousel_loop);
					}
				});
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
				panelContent: '=',
				stopInterval: '='
            },
			controller: controller,
            templateUrl: 'blocks/directives/carousel/carousel.html',
			transclude: true,
			css: [{href: 'blocks/directives/carousel/carousel.css'}]
		};
	}
	
})();