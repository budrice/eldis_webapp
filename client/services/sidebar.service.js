(function() {
	
	'use strict';
	
	angular.module('app')
	.factory('SidebarService', SidebarService);
	
	SidebarService.$inject = [];
	function SidebarService() {
		
		return {
			getSidebar: getSidebar
		};
		
		function getSidebar() {
			return new Promise((resolve)=> {
				resolve({
					bars: 	[{
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
							}],
					css:	{
								backcolor: '#003e6d',
								backhover: '#003e6d',
								charcolor: '#fff',
								charhover: '#00ffff'
							}
				});
			});
		}
		
	}
	
})();