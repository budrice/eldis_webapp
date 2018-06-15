(function () {

    'use strict';

    angular.module('app')
	.controller('AdminController', AdminController);

    AdminController.$inject = ['$scope', 'AppService', '$filter', 'msgbox'];
    function AdminController($scope, AppService, $filter, msgbox) {
        
		$scope.users = [];
		
		function getList() {
			return new Promise((resolve, reject)=> {
				AppService.BasicSearch('authentication', null, null).then((result)=> {
					if (result.error) {
						console.log(result);
						msgbox.warning('you broke it, you buy it...');
					}
					else {
						resolve(result.data);
					}
				}, (error)=> { reject(error); });
			});
		}
		
		function formatDates(data_row) {
			return new Promise((resolve)=> {
				let date_fields = ['date_join', 'date_last_log'];
				let search_result = angular.copy(data_row);
				console.log(data_row);
				date_fields.forEach((field)=> {
					console.log(data_row[field]);
					search_result[field] = $filter('date')(new Date(data_row[field]), 'MM/dd/yyyy h:mm a');
				});
				resolve(search_result);
			});
		}
		
		function populateList(data_row) {
			$scope.users.push(data_row);
			$scope.$apply();
		}
		
		init();
		function init() {
			getList().then((array)=> {
				array.forEach((row)=> {
					formatDates(row)
					.then(populateList);
				});
				msgbox.info('list loaded');
			});
			
		}
        
    }
	
})();