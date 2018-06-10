(function () {
    
    'use strict';
    
    let app = angular.module('app', [
        'ngAnimate', 'ngRoute', 'ngSanitize', 'ui.bootstrap', 'angularCSS'
    ]);
	app.config(['$locationProvider', ($locationProvider)=> {
        $locationProvider.hashPrefix('');
    }])
	.run(()=> {
        
        String.prototype.firstUpper = ()=> {
            return this.charAt(0).toUpperCase() + this.slice(1);
        };
        
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
        
        
        
        
        
    });
    
})();