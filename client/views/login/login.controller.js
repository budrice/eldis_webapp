(function () {

    'use strict';

    angular.module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'AuthenticationService'];
    function LoginController($scope, AuthenticationService) {
        
        console.log('LOGIN CONTROLLER');
        
        let user_object = {
            username: 'Xysst',
            email_address: 'r.eldis@yahoo.com',
            password: 'qwerty'
        };
        AuthenticationService.Register(user_object)
        .then((result)=> {
            console.log(result);
        }, (error)=> {
            console.log(error);
        });
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    }
})();