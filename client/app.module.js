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
            },
			{
                hash: '',
                label: 'Contact Eldis'
            }];
            return nav_array;
        };
		
        Array.prototype.navStyle = ()=> {
            let nav_style = [{
				backcolor: '#003e6d',
				backhover: '#003e6d',
				charcolor: '#fff',
				charhover: '#00ffff'
            }];
            return nav_style;
        };
		

		
		$rootScope.$on('$locationChangeStart', function () {
			let user_object = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
			console.log(user_object);
			if (user_object !== null) {
				if (user_object.token) {
					AppService.BasicSearch( 'authentication', 'token', user_object.token)
					.then((result)=> {
						if (result.data.length === 0) {
							msgbox.warning('Redirecting to login.');
							window.sessionStorage.removeItem('USER_OBJ');
							$location.path('/login/');
						}
					}, (error)=> {
						console.log(error);
					});
				}
			}
			else {
				msgbox.warning('Redirecting to login.');
				$location.path('/login/');
			}
        });
		
    }]);
    
})();