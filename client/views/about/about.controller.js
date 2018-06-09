(function () {

    'use strict';

    angular.module('app')
	.controller('AboutController', AboutController);

    AboutController.$inject = ['$scope', 'msgbox', '$location'];
    function AboutController($scope, msgbox, $location) {
        
        var userObj = {};
        userObj = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
		
		$scope.sidebars = [{
			hash: 'home',
			label: 'Home'
		},
		{
			hash: 'technologies',
			label: 'Technologies'
		},
		{
			hash: 'contact',
			label: 'Contact'
		}];
		
		$scope.sidebarCssObject = {
			backcolor: '#003e6d',
			backhover: '#003e6d',
			charcolor: '#fff',
			charhover: '#00ffff'
		};
		
		$scope.imagebox = [{
			icon: '../../images/construction.png',
			icon_alt: 'hard hat',
			title: 'The beginning...',
			image: '../../images/blaster_.jpg',
			image_alt: 'shot-blasting',
			img_frame_min: '595px',
			img_panel_min: '387px',
			panel_min: '347px'
		},
		{
			icon: '../../images/recycle.png',
			icon_alt: 'recycle',
			title: 'E-Test Manager',
			image: '../../images/board_.jpg',
			image_alt: 'integrated circuit',
			img_frame_min: '595px',
			img_panel_min: '387px',
			panel_min: '347px'
		},
		{
			icon: '../../images/college.png',
			icon_alt: 'college',
			title: 'Kaplan University',
			image: '../../images/kaplan_.jpg',
			image_alt: 'college cap',
			img_frame_min: '595px',
			img_panel_min: '387px',
			panel_min: '347px'
		},
		{
			icon: '../../images/vs.png',
			icon_alt: 'VS',
			title: 'Programmer',
			image: '../../images/code__.jpg',
			image_alt: 'code',
			img_frame_min: '584px',
			img_panel_min: '326px',
			panel_min: '286px'
		}];
		
		init();
        function init() {
			console.log(userObj);
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