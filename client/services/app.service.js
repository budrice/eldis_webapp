(function() {
	
	'use strict';
	
	angular.module('app')
	.factory('AppService', AppService);
	
	AppService.$inject = ['$http'];
	function AppService($http) {
		
		return {
			Register: register,
			Login: login,
			BasicSearch: basicSearch,
			IsLoggedIn: isLoggedIn,
			GetUserObject: getUserObject
		};
		
		function register(user_object) {
			return new Promise((resolve, reject)=> {
				$http({
					method: 'POST',
					url: '/api/v1/database/register',
					data: user_object
				}).then(function(response) {
					resolve(response.data);
				}, function(response) {
					reject(response.data);
				});
			});
		}
		
		function login(dataObj) {
            return new Promise((resolve, reject)=> {
				let user = {};
				user = getUserObject() || {};
				$http({
					method: 'POST',
					url: '/api/v1/database/login',
					data: dataObj
				}).then((result)=> {
					user.token = (result.error) ? null : result.data.token;
					window.sessionStorage.setItem('USER_OBJ', JSON.stringify(user));
					resolve(result);
				}, (error)=> {
					reject(error);
				});
				
			});
        }
		
		function basicSearch(table, key, value) {
			return new Promise((resolve, reject)=> {
				$http({
					method: 'GET',
					url: '/api/v1/database/basicsearch/' + table + '/' + key + '/' + value
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
		}
		
		/**
		 * isLoggedIn
		 * @return {Boolean} is logged in
		 */
		function isLoggedIn() {
			let response = true;
			let userObj = JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
			if (userObj === null) {
				response = false;
			}
			return response;
		}
		
		/**
		 * getUserObject
		 * @return {Object} user object carries token
		 */
        function getUserObject(){
            return JSON.parse(window.sessionStorage.getItem('USER_OBJ'));
        }
		
	}
	
})();