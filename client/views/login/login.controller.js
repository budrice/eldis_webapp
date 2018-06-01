(function () {

    'use strict';

    angular.module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'AppService', 'msgbox'];
    function LoginController($scope, AppService, msgbox) {
        $scope.model = {};
        
        let is_logged_in;
        let register_flag = 0;
        
        $scope.login_obj = {};

        

        
        $scope.login = ()=> {
            AppService.Login($scope.model)
            .then((result)=> {
                if (result.data.is_logged_in === 1) {
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
            AppService.Register(user_object)
            .then(()=> {
                msgbox.success('Welcome.');
                
            }, (error)=> {
                console.log(error);
            });
        };
        $scope.basicSearch = (arg_key, arg_value)=> {
            if (arg_value.length > 0) {
                AppService.BasicSearch('authentication', arg_key, arg_value)
                .then((result)=> {
                    if (result.data.length > 0) {
                        $scope.message = "Valid " + arg_key + ".";
                        $scope.login_obj.disabled.login_btn = false;
                        $scope.model = result.data[0];
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
       
        init();
        function init() {
            getLogin();
            setBtnsDefault();
        }
        
    }
})();