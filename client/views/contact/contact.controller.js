(function () {

    'use strict';

    angular.module('app').controller('ContactController', ContactController);

    ContactController.$inject = ['$scope', 'AppService', 'msgbox'];
    function ContactController($scope, AppService, msgbox) {
		
		$scope.contact = {};
        let user_object = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
		
		/**
		 * send
		 */
		$scope.send = ()=> {
			if ($scope.contact_form.$dirty) {
				let email = {
					from: user_object.data.emailaddress,
					subject: $scope.contact.subject,
					text: $scope.contact.message
				};
				AppService.SendEmail(email).then((result)=> {
					$scope.contact = {};
					$scope.$digest();
					msgbox.info(result.data.message);
				}, (error)=> {
					msgbox.warning('Something went wrong!');
					console.log(error);
				});
			}
		};
        
    }
	
})();