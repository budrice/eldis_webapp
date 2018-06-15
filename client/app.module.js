(function () {
    
    'use strict';
    
    let app = angular.module('app', [
        'ngAnimate', 'ngRoute', 'ngSanitize', 'ui.bootstrap', 'angularCSS'
    ]);
	app.config(['$locationProvider', ($locationProvider)=> {
        $locationProvider.hashPrefix('');
    }])
	.run(['$rootScope', 'AppService', '$location', 'msgbox', ($rootScope, AppService, $location, msgbox)=> {
		
        Array.prototype.getDefaultNavLinks = ()=> {
			let user_object = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
            let nav_array = [{
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
                label: 'Contact Eldis'
            }];
			if (user_object !== null) {
				if (user_object.data)
				if (user_object.data.access_level === 3) {
					nav_array.push({
						hash: 'admin',
						label: 'Admin'
					});
				}
			}
            return nav_array;
        };
		
		$rootScope.$on('$locationChangeStart', (event, next)=> {
			let user_object = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
			if (user_object !== null) {
				if (user_object.data)
				if (user_object.data.token) {
					AppService.BasicSearch( 'authentication', 'token', user_object.data.token)
					.then((result)=> {
						if (result.data.length === 0) {
							msgbox.warning('Redirecting to login.');
							window.sessionStorage.removeItem('USER_OBJ');
							$location.reload();
						}
						else {
							if (!user_object.data) {
								msgbox.warning('Redirecting to login.');
								window.sessionStorage.removeItem('USER_OBJ');
								$location.reload();
								if (!user_object.data.token) {
									msgbox.warning('Redirecting to login.');
									window.sessionStorage.removeItem('USER_OBJ');
									$location.reload();
								}
							}
							if ((next.endsWith('admin') || next.endsWith('admin/')) && user_object.data.access_level < 3) {
								msgbox.warning('Redirecting to login.');
								window.sessionStorage.removeItem('USER_OBJ');
								$location.reload();
							}
							
						}
					}, (error)=> {
						console.log(error);
					});
				}
			}
			else {
				if (!next.endsWith('/login/')) {
					msgbox.warning('Redirecting to login.');
					$location.path('/login/');
				}
			}
        });
		
    }]);
    
})();