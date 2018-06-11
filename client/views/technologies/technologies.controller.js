(function () {

    'use strict';

    angular.module('app')
	.controller('TechnologiesController', TechnologiesController);

    TechnologiesController.$inject = ['$scope'];
    function TechnologiesController($scope) {
        
        var userObj = {};
        userObj = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
		
		$scope.imagebox = [{
			icon: '../../images/rubics.png',
			icon_alt: 'technologies',
			title: 'Technologies',
			image: '../../images/head_2.jpg',
			image_alt: 'code',
			img_frame_min: '584px',
			img_panel_min: '326px',
			panel_min: '286px'
		}];
		
    }
})();