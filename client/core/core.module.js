(function () {

    'use strict';
    
    angular.module('app.core', [
        /*
        * Angular modules
        */
        'ngAnimate', 'ngRoute', 'ngSanitize', 'ui.bootstrap', 'angularCSS',
        /*
        * Our reusable cross app code modules
        */
        'ngRouteHelper', 'Msgbox'
        
    ]);

})();