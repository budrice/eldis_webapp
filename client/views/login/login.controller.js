(function () {

    'use strict';

    angular.module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'AuthenticationService', 'msgbox'];
    function LoginController($scope, AuthenticationService, msgbox) {
        $scope.model = {};
        
        let is_logged_in;
        let register_flag = 0;
        
        $scope.login_obj = {};
        $scope.login_obj.view = {
            login_btn: true,
            registration_pass: false,
            registration_btn: true
        };
        
        $scope.login_obj.disabled = {
            login_btn: true,
            registration_btn: false
        };
        
        $scope.login = ()=> {
            console.log('logging in...');
            AuthenticationService.Login($scope.model)
            .then((result)=> {
                //console.log(result.data);
                if (result.data.is_logged_in === 1) {
                    console.log('changing location');
                    window.sessionStorage.setItem('USER_OBJ', JSON.stringify(result.data));
                    window.location = "/";
                }
                else {
                    msgbox.warning("You are not logged in.");
                }
            }, (error)=> {
                console.log(error);
            });
        };
        
        $scope.register = ()=> {
            if (register_flag === 0) {
                $scope.login_obj.view = {
                    login_btn: false,
                    registration_pass: true,
                    registration_btn: true,
                    logout_btn: false
                };
                register_flag++;
                return;
            }
            AuthenticationService.Register(user_object)
            .then((result)=> {
                console.log(result);
                msgbox.success('Welcome.');
                
            }, (error)=> {
                console.log(error);
            });
        };
        
        $scope.getUsername = (username)=> {
            if (username.length > 0) {
                AuthenticationService.GetUsername(username)
                .then((result)=> {
                    console.log(result.data);
                    if (result.data.length > 0) {
                        $scope.message = "Valid username.";
                        $scope.login_obj.disabled.login_btn = false;
                        result.data[0].password = null;
                        $scope.model = result.data[0];
                    }
                    else {
                        $scope.message = "";
                        $scope.model.email_address = null;
                        $scope.login_obj.disabled.login_btn = true;
                    }
                    $scope.$apply();
                }, (error)=> {
                    console.log(error);
                });
            }
        };
        
        $scope.getEmailAddress = (email_address)=> {
            if (email_address.length > 0) {
                AuthenticationService.GetEmailAddress(email_address)
                .then((result)=> {
                    console.log(result.data);
                    if (result.data.length > 0) {
                        $scope.message = "Valid email.";
                        $scope.login_obj.disabled.login_btn = false;
                        $scope.model = result.data[0];
                    }
                    else {
                        $scope.message = "";
                        $scope.model.username = null;
                        $scope.login_obj.disabled.login_btn = true;
                    }
                    $scope.$apply();
                }, (error)=> {
                    console.log(error);
                });
            }
        };
        
        function getLogin() {
            is_logged_in = AuthenticationService.IsLoggedIn();
            if (is_logged_in) {
                $scope.message = "You are logged in.";
                $scope.login_obj.view = {
                    login_btn: false,
                    registration_pass: false,
                    registration_btn: false,
                    logout_btn: true
                };
            }
            console.log(is_logged_in);
        }
       
        init();
        function init() {
            getLogin();
        }
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    }
})();