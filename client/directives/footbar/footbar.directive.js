(function() {
	
	'use strict';
	
	angular.module('app').directive('budFootbar', budFootbar);
	
	function budFootbar(){
		
		controller.$inject = [];
		function controller() {
			
			init();
			function init() {
				// to do:
				// social media connects
			}
			
		}
		
        return {
            restrict: 'EA',
            scope: {
                
            },
            controller: controller,
            templateUrl: 'directives/footbar/footbar.html',
			css: [{href: 'directives/footbar/footbar.css'}]
		};
	}
	
})();