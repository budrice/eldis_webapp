(function () {

    'use strict';

    angular.module('app').controller('AdminController', AdminController);

    AdminController.$inject = ['$scope', 'AppService', '$filter', 'msgbox'];
    function AdminController($scope, AppService, $filter, msgbox) {
        
		$scope.users = [];
		
		function getList() {
			return new Promise((resolve, reject)=> {
				AppService.BasicSearch('authentication', null, null).then((result)=> {
					if (result.error) {
						console.log(result.error);
						msgbox.warning('you broke it, you bought it...');
					}
					else {
						console.log(result.data);
						resolve(result.data);
					}
				}, (error)=> { reject(error); });
			});
		}
		
		function formatDates(data_row) {
			return new Promise((resolve)=> {
				let date_fields = ['date_join', 'date_last_log'];
				let search_result = angular.copy(data_row);
				date_fields.forEach((field)=> {
					search_result[field] = $filter('date')(new Date(data_row[field]), 'MM/dd/yyyy h:mm a');
				});
				console.log(data_row.remove);
				data_row.remove = (data_row.remove === 1) ? true : false;
				resolve(search_result);
			});
		}
		
		function populateList(data_row) {
			$scope.users.push(data_row);
			$scope.$apply();
		}
		
		$scope.admin = {};
		$scope.toogle = false;
		$scope.toggleModal = (user)=> {
			$scope.toggle = true;
			$scope.admin = user;
		};
		
		$scope.update = (form, update_object)=> {
			update_object.remove = (update_object.remove) ? 1 : 0;
			let id = angular.copy(update_object.id);
			delete update_object.id;
			delete update_object.date_join;
			delete update_object.date_last_log;
			delete update_object.token;
			if (form.$dirty) {
				AppService.Update('authentication', id, update_object)
				.then((result)=> {
					if (result.error) {
						console.log(result);
						msgbox.warning('Something went wrong.');
					}
					else {
						form.$setPristine(); 
						form.$setUntouched();
						msgbox.info('Update succeeded.');
						init();
					}
				}, (error)=> {
					console.log(error);
					msgbox.warning('Something went wrong.');
				});
			}
		};
		
		init();
		function init() {
			$scope.users = [];
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