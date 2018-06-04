(function () {

    'use strict';

    angular.module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'msgbox', '$location', '$window'];
    function HomeController($scope, msgbox, $location, $window) {
        
        var userObj = {};
        userObj = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
		
		let i = 0;
		let ht = $("#slideshow_ul").height();
		let vht = ht/length;
		$("#slide").css({'height': vht});
				
		function next() {
			let length = $("#slideshow_ul li").length;
			if (i < length) {
				let ht = $("#slideshow_ul").height();
				let vht = ht/length;
				let top = i * vht;
				$("#slideshow").css({'margin-top': "-" + top + "px"});
				$("#slide").css({'height': vht});
				$scope.show_slide_ui = true;
				$scope.$apply();
				i = (i == (length - 1) ? 0 : i + 1);
			}
		}
        
        init();
        function init() {
            if (userObj === null) {
                msgbox.info('redirecting to login...');
				$location.path('/login/');
				$window.location.reload();
            }
			else {
				angular.element(document).ready(next);
				setInterval(function() {
					next();
				}, 3000);
			}
        }
        
    }
})();