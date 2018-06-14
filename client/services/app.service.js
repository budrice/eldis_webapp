(function() {
	
	'use strict';
	
	angular.module('app')
	.factory('AppService', AppService);
	
	AppService.$inject = ['$http', '$window', '$rootScope'];
	function AppService($http, $window, $rootScope) {
		
		// Events are broadcast outside the Scope Lifecycle
		$window.onbeforeunload = ()=> {
			let confirmation = {};
			//let event = $rootScope.$broadcast('onBeforeUnload', confirmation);
			update('authentication', { token: null, is_logged_in: 0 }).then(()=> {
				$rootScope.$broadcast('onBeforeUnload', confirmation);
				return confirmation.message;
			});
			//if (event.defaultPrevented) {
			//	return confirmation.message;
			//}
		};
		
		return {
			Register: register,
			Login: login,
			BasicSearch: basicSearch,
			Update: update,
			IsLoggedIn: isLoggedIn,
			GetUserObject: getUserObject
		};
		
		function register(user_object) {
			return new Promise((resolve, reject)=> {
				$http({
					method: 'POST',
					url: '/api/v1/database/register',
					data: user_object
				}).then((result)=> {
					resolve(result);
				}, (error)=> {
					reject(error);
				});
			});
		}
		
		function login(dataObj) {
            return new Promise((resolve, reject)=> {
				$http({
					method: 'POST',
					url: '/api/v1/database/login',
					data: dataObj
				}).then((result)=> {
					if (result.error) {
						console.log(result.error);
					}
					else {
						window.sessionStorage.setItem('USER_OBJ', JSON.stringify(result));
					}
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
		
		function update(table, update_object) {
			return new Promise((resolve, reject)=> {
				$http({
					method: 'POST',
					url: '/api/v1/database/update',
					data: update_object
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