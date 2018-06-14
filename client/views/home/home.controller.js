(function () {

    'use strict';

    angular.module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope'];
    function HomeController($scope) {
		
		$scope.carousel = [{
			id: 1,
			src: '../../images/carousel_0.jpg',
			alt: 'AutoIT sphere',
			title: 'AutoIT sphere',
			text: 'PhotoShop art of my AutoIT code and a sphere'
		},
		{
			id: 2,
			src: '../../images/carousel_1.jpg',
			alt: 'Font fire',
			title: 'Font Fire',
			text: 'Photoshop art I did using a font on fire tutorial'
		},
		{
			id: 3,
			src: '../../images/carousel_2.jpg',
			alt: 'Sushi',
			title: 'Sushi',
			text: 'I just like sushi. I lived in Okinawa, Japan for eight years'
		}];
		
		$scope.$on('onBeforeUnload', function (e, confirmation) {
			confirmation.message = "All data willl be lost.";
			e.preventDefault();
		});
        
    }
})();