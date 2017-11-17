(function(app) {
	app.controller('HistoryController', ['$scope', '$mdDialog', '$location', 'HistoryRepository', function($scope, $mdDialog, $location, HistoryRepository) {
	  	
	  	$scope.allHistory = HistoryRepository.getAll().reverse();
      	
      	$scope.calcList = function() {
        	return this.allHistory;
      	};

      	$scope.setCalculator = function(calc) {
      		HistoryRepository.setCurrentCalc(angular.copy(calc));
      		$location.path('/');
      	}

      	$scope.clearHistory = function() {
      		$mdDialog.show(
			    $mdDialog.confirm()
		        .title('Confirmation')
		        .textContent('Do you really want to erase all your history?')
		        .ariaLabel('Confirmation')
		        .ok('Yes')
		        .cancel('Cancel')
		        .targetEvent(event)
		    ).then(function() {
		      	HistoryRepository.clearHistory();
		      	$location.path('/');
		    }, function(){});
      	}
	}]);
})(TaqeCalculator);
