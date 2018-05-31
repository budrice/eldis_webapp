(function() {
	
	'use strict';
	
	angular.module('app')
	.factory('AuthenticationService', AuthenticationService);
	
	AuthenticationService.$inject = ['$http'];
	function AuthenticationService($http) {
		
		return {
			Register: register,
			Login: login,
			GetUsername: getUsername,
			GetEmailAddress: getEmailAddress,
			IsLoggedIn: isLoggedIn,
			GetUserToken: getUserToken
		};
		
		function register(user_object) {
			let promise = new Promise((resolve, reject)=> {
				$http({
					method: 'POST',
					url: '/api/v1/admin/register',
					data: user_object
				}).then(function(response) {
					resolve(response.data);
				}, function(response) {
					reject(response.data);
				});
			});
			return promise;
		}
		
		function login(dataObj) {
            let promise = new Promise((resolve, reject)=> {
				$http({
					method: 'POST',
					url: '/api/v1/admin/login',
					data: dataObj
				}).then((result)=> {
					if (result.error) {
						reject(result);
					}
					else {
						let user_token = result.token;
						window.sessionStorage.setItem('USER_TOKEN', JSON.stringify(user_token));
						resolve(result);
					}
				}, (error)=> {
					reject(error);
				});
			});
            return promise;
        }
		
		function getUsername(username) {
			let promise = new Promise((resolve, reject)=> {
				$http({
					method: 'GET',
					url: '/api/v1/admin/getusername/' + username,
				}).then((result)=> {
					if (result.error) {
						reject(result);
					}
					else {
						resolve(result);
					}
				}, (error)=> {
					reject(error);
				});
			});
			return promise;
		}
		
		function getEmailAddress(email_address) {
			console.log(email_address);
			let promise = new Promise((resolve, reject)=> {
				$http({
					method: 'GET',
					url: '/api/v1/admin/getemailaddress/' + email_address,
				}).then((result)=> {
					if (result.error) {
						reject(result);
					}
					else {
						resolve(result);
					}
				}, (error)=> {
					reject(error);
				});
			});
			return promise;
		}
		
		function isLoggedIn() {
			let response = true;
			let userObj = JSON.parse(window.sessionStorage.getItem('USER_OBJECT'));
			if (userObj === null) {
				response = false;
			}
			return response;
		}
		
        function getUserToken(){
            var user_token = JSON.parse(window.sessionStorage.getItem('USER_TOKEN'));
            return user_token;
        }
		
	}
	
})();