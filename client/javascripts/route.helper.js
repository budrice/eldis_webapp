(function () {
	
    'use strict';

    angular.module('ngRouteHelper', [])
    .factory('RouteHelper', RouteHelper);
		
    RouteHelper.$inject = ['$location', '$rootScope', 'msgbox'];
    function RouteHelper($location, $rootScope, msgbox) {
		return {
			listen: listen
		};
		//listen();
		function listen() {
			console.log('listening');
			$rootScope.$on('$locationChangeStart', function (e, next) { 
				if( !next.endsWith('/login')){
					if( window.sessionStorage.getItem('UserObj') === null ) {
						msgbox.warning('Session is not defined - Redirecting to login');
						$location.path('/login');
					}
				}
			});
		}
    }
})();