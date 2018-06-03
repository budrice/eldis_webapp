(function () {

    'use strict';

    angular.module('app')
    .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', '$location'];
    function IndexController($scope, $location) {
        
        init();
        function init() {
            
			$scope.currentPath = $location.path();
			
        }
        
    }
})();