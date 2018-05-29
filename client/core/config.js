(function () {
   
   'use strict';
   
   var core = angular.module('app.core');
   
   core.config(toastrConfig);
   function toastrConfig(toastr){
      toastr.options.timeOut = 4000;
      toastr.options.positionClass = 'toast-bottom-right';
   }
   
   var config = {
      appErrorPrefix: '[Eldis_App: Error] ',
      appTitle: 'Eldis App',
      version: '1.0.0'
   };
   
   core.value('config', config);
   
})();