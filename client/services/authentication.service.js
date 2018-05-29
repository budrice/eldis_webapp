(function() {
	
	'use strict';
	
	angular.module('app')
	.factory('AuthenticationService', AuthenticationService);
	
	AuthenticationService.$inject = ['$http'];
	function AuthenticationService($http) {
		
		return {
			Register: register,
			Login: login,
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
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: '/api/v1/admin/login',
                data: dataObj
            }).then(function(response) {
                if (response.data.error) {
                    deferred.resolve(response.data);
                }
                else {
                    var USER_TOKEN = response.data.result.token;
                    window.sessionStorage.setItem('USER_TOKEN', JSON.stringify(USER_TOKEN ));
                    deferred.resolve(response.data);
                }
            }, function(response) {
                deferred.reject(response.data);
            });
            return deferred.promise;
        }
		
		function isLoggedIn() {
			let promise = new Promise((resolve, reject)=> {
				$http({
					method: 'GET',
					url: '/api/v1/admin/isloggedin',
				}).then(function(response) {
					resolve(response.data);
				}, function(response) {
					reject(response.data);
				});
			});
			return promise;
		}
		
        function getUserToken(){
            var USER_TOKEN = JSON.parse(window.sessionStorage.getItem('USER_TOKEN'));
            return USER_TOKEN;
        }
		
	}
	
})();