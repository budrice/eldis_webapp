(function () {

    'use strict';

    angular.module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'msgbox', '$location'];
    function HomeController($scope, msgbox, $location) {
        
        var userObj = {};
        userObj = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
		
		$scope.carousel = [{
			id: 1,
			src: '../../images/carousel_0.jpg',
			alt: 'AutoIT sphere',
			text: 'The picture above is a Photoshop art I did using a screenshot of my AutoIT code and a sphere tutorial.'
		},
		{
			id: 2,
			src: '../../images/carousel_1.jpg',
			alt: 'Font fire',
			text: 'The picture above is a Photoshop art I did using a font on fire tutorial.'
		},
		{
			id: 3,
			src: '../../images/carousel_2.jpg',
			alt: 'Sushi',
			text: 'I just like sushi. I lived in Okinawa, Japan for eight years.'
		}];
		
		init();
        function init() {
            if (userObj !== null) {
				if (userObj.token) {
					// do check of token
				}
				else {
					msgbox.info('redirecting to login...');
					$location.path('/login/');
				}
            }
			else {
				msgbox.info('redirecting to login...');
				$location.path('/login/');
			}
        }
        
    }
})();