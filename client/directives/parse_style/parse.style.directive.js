(function() {
	
	'use strict';
	
	angular.module('app')
	.directive('parseStyle', parseStyle);
	
	parseStyle.$inject = ['$interpolate'];
	function parseStyle($interpolate) {
		return (scope, elem)=> {
			let exp = $interpolate(elem.html()),
			watchFn = ()=> {
				return exp(scope);
			};
			scope.$watch(watchFn, (html)=> {
				elem.html(html);
			});
		};
	}
	
})();