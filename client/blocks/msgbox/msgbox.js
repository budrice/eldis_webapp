(function() {
   
   'use strict';

   angular.module('app')
   .factory('msgbox', msgbox).config(()=> {
      toastr.options.timeOut = 4000;
      toastr.options.positionClass = 'toast-bottom-right';
   });

   msgbox.$inject = [];
   function msgbox() {
      
      return {
         showToasts: true,
         error: error,
         info: info,
         success: success,
         warning: warning,
      };
      
      function error(message, data, title) {
         toastr.error(message, title);
      }
      function info(message, data, title) {
         toastr.info(message, title);
      }
      function success(message, data, title) {
         toastr.success(message, title);
      }
      function warning(message, data, title) {
         toastr.warning(message, title);
      }
   }
}());