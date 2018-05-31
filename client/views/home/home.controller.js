(function () {

    'use strict';

    angular.module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope'];
    function HomeController($scope) {
        
        var userObj = {};
        userObj = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
        console.log(userObj);
        //let now = new Date();
        //let auto_height_offset = 320;
        /**
         * getView
         */
        //function getView() {
        //    auto_height_offset = (auto_height_offset) ? auto_height_offset : 600;
        //    $('#eldis_webapp_home_content').css({'height': window.innerHeight - auto_height_offset});
        //    window.addEventListener('resize', function(){
        //        $('#eldis_webapp_home_content').css({'height': window.innerHeight - auto_height_offset});
        //    });
        //}
        
        init();
        function init() {
            //$scope.year = $filter('date')(now, 'yyyy');
            //getView();
            if (userObj === null) {
                console.log('redirecting to login...');
                window.location = '/#/login';
            }
        }
        
    }
})();