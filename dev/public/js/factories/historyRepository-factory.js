angular.module('calculator.services', [])

.factory('HistoryRepository', ['$window', '$filter', function($window, $filter) {

  // Calculation list
  var storageKey = "CALC_HISTORY";
  var calcHistory = [];
  var currentCalc;

  var getHistory = function() {
  	if(calcHistory.length == 0) {
  		var storedValue = $window.localStorage.getItem(storageKey);
  		if(storedValue) {
  			calcHistory = JSON.parse(storedValue);
  		}
  	}

    calcHistory = $filter('orderBy')(calcHistory, 'id');
  }

  return {
    setCurrentCalc: function(calc) {
      currentCalc = calc;
    },
    getCurrentCalc: function(calc) {
      if(!currentCalc)
        currentCalc = this.createCalc();

      return currentCalc;
    },
    createCalc: function() {
      return {
               firstNumber: "",
               secondNumber: "",
               operator: "",
               result: "",
             };
    },
    addCalculation: function(calc) {
      if(calcHistory.length == 0) getHistory();
      
      calc.id = calcHistory.length;
    	calcHistory.push(calc);
    	$window.localStorage.setItem(storageKey, JSON.stringify(calcHistory));
    },
    getAll: function() {
      getHistory();

    	return calcHistory;
    },
    clearHistory: function() {
      calcHistory = [];
      $window.localStorage.setItem(storageKey, JSON.stringify([]));
    }
  };
}]);