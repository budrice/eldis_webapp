(function() {
	
	'use strict';
	
	angular.module('app').directive('budModal', budModal);
	
	function budModal(){
		
		controller.$inject = ['$scope'];
		function controller($scope) {
			
			$scope.$watch('toggleModal', (val)=> {
				$scope.toggleModal = val;
				setTimeout(()=> {
					$scope.$digest();
				}, 0);
			}, true);
			
			$scope.close = ()=> {
				console.log('close modal...');
				$scope.toggleModal = false;
				setTimeout(()=> {
					$scope.$digest();
				}, 0);
			};
			
		}
		
        return {
            restrict: 'EA',
			transclude: true,
            scope: {
                toggleModal: '=',
				modalOptions: '='
            },
			controller: controller,
            templateUrl: 'directives/modal/modal.html',
			css: [{ href: 'directives/modal/modal.css' }]
		};
	}
	
})();