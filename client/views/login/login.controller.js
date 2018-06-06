(function () {

    'use strict';

    angular.module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'AppService', 'msgbox', '$location'];
    function LoginController($scope, AppService, msgbox, $location) {
        
        $scope.model = {};
        
        let is_logged_in;
        let register_flag = 0;
        
        $scope.login_obj = {};
        
        $scope.login = ()=> {
            AppService.Login($scope.model)
            .then((result)=> {
                if (result.data.is_logged_in === 1) {
                    window.sessionStorage.setItem('USER_OBJ', JSON.stringify(result.data));
                    $location.path('/home/');
                }
                else {
                    msgbox.warning("You are not logged in.");
                }
                $scope.$apply();
            }, (error)=> {
                console.log(error);
            });
        };
        
        $scope.register = ()=> {
            register_flag++;
            switch (register_flag) {
                case 1:
                    $scope.message = "Create a username and password.";
                    $scope.login_obj.view = {
                        login_btn: false,
                        registration_pass: true,
                        registration_btn: true,
                    };
                    break;
                case 2:
                    let m = {};
                    m = $scope.model;
                    if (m.password === m.repassword && m.username && m.email_address) {// && $scope.login_form.$valid) {
                        AppService.Register($scope.model)
                        .then(()=> {
                            register_flag = 0;
                            $scope.message = "Registration succeeded.\nYou are able to log in.";
                            $scope.$apply();
                            msgbox.success("Welcome.");
                            
                        }, (error)=> {
                            register_flag = 0;
                            $scope.message = "Registration failed.\nYou are unable to log in.";
                            msgbox.warning("Error. Registration failed.\nThe issue has been reported.\nRefresh and try again.");
                            $scope.$apply();
                            console.log(error);
                        });
                    }
                    break;
            }
        };
        
        $scope.userSearch = (arg_key, arg_value = [])=> {
            if (arg_value.length > 0) {
                AppService.BasicSearch('authentication', arg_key, arg_value)
                .then((result)=> {
                    if (result.data.length > 0) {
                        if (register_flag > 0) {
                            $scope.message = arg_key + " is already registered.";
                        }
                        else {
                            $scope.message = "Welcome " + result.data[0].username + ", you are able to log in.";
                            $scope.login_obj.view = {
                                login_btn: true,
                                registration_pass: false,
                                registration_btn: false,
                            };
                            $scope.login_obj.disabled.login_btn = false;
                            $scope.model = result.data[0];
                        }
                    }
                    else {
                        $scope.message = "";
                        $scope.login_obj.disabled.login_btn = true;
                    }
                    $scope.$apply();
                }, (error)=> {
                    console.log(error);
                });
            }
        };
        
        function setBtnsDefault() {
            $scope.login_obj.view = {
                login_btn: true,
                registration_pass: false,
                registration_btn: true
            };
            $scope.login_obj.disabled = {
                login_btn: true,
                registration_btn: false
            };
        }
        
        function getLogin() {
            is_logged_in = AppService.IsLoggedIn();
            if (is_logged_in) {
                $scope.message = "You are logged in.";
                $scope.login_obj.view = {
                    login_btn: false,
                    registration_pass: false,
                    registration_btn: false,
                    logout_btn: true
                };
            }
        }
        
        $('#eldis_app_login_container').keypress((event)=> {
            if (event.which == 13 && register_flag === 0) {
                $scope.login();
            }
            else if (event.which == 13 && register_flag > 0) {
                $scope.register();
            }
        });
        
        init();
        
        function init() {
            getLogin();
            setBtnsDefault();
        }
        
    }
})();