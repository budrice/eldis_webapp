(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('titledImagebox', titledImagebox);
	
	function titledImagebox(){
		
        return {
            restrict: 'EA',
            scope: {
                frameCss: '@',
				imagebox: '='
            },
			transclude: true,
            templateUrl: 'blocks/directives/titled_imagebox/titled.imagebox.html',
			css: [{ href: 'blocks/directives/titled_imagebox/titled.imagebox.css' }]
		};
		
	}
	
})();