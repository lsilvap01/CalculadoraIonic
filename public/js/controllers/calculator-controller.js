(function(app) {
	app.controller('CalculatorController', ['$scope','$mdDialog', '$timeout', 'HistoryRepository',  function($scope, $mdDialog, $timeout, HistoryRepository) {
		  
		  $scope.currentCalc = HistoryRepository.getCurrentCalc();
		  $scope.shouldShowResult = $scope.currentCalc.result && $scope.currentCalc.result != "";

		  var MAX_DIGITS = 7;

		  $scope.addDigit = function(d) {
		  	if(this.shouldShowResult)
		  		this.clearAll();

		  	if(!isOperatorSet() && this.currentCalc.firstNumber.length < MAX_DIGITS) {
		  		this.currentCalc.firstNumber += "" + d;
		  	}
		  	else if(isOperatorSet() && this.currentCalc.secondNumber.length < MAX_DIGITS) {
		  		this.currentCalc.secondNumber += "" + d;
		  	}
		  	else {
		  		$mdDialog.show(
			      $mdDialog.alert()
			        .title('Warning')
			        .textContent('Each number can have at most ' + MAX_DIGITS + ' digits')
			        .ariaLabel('Input validation error')
			        .ok('Ok')
			        .targetEvent(event)
			    );
		  	}
		  }

		  $scope.setOperator = function(op) {
		  	if(this.shouldShowResult)
		  		this.clearAll();

		  	this.currentCalc.operator = op;
		  	if($scope.currentCalc.firstNumber == "")
		  		$scope.currentCalc.firstNumber = "0";
		  }

		  $scope.evalOperation = function() {
		  	if(this.shouldShowResult) return;

		  	switch(this.currentCalc.operator) {
		  		case "*":
		  			this.currentCalc.result = getFirstNumber() * getSecondNumber();
		  			break;
		  		case "+":
		  			this.currentCalc.result = getFirstNumber() + getSecondNumber();
		  			break;
		  		case "-":
		  			this.currentCalc.result = getFirstNumber() - getSecondNumber();
		  			break;
		  		default:
		  			this.currentCalc.result = getFirstNumber();
		  			break;
		  	}

		  	var currentCalcTemp =  angular.copy(this.currentCalc);
		  	HistoryRepository.addCalculation(this.currentCalc);
		  	this.shouldShowResult = true;
		  	this.currentCalc = currentCalcTemp;
		  	HistoryRepository.setCurrentCalc(this.currentCalc);
		  }

		  $scope.clearAll = function() {
		  	this.currentCalc = HistoryRepository.createCalc();
		  	HistoryRepository.setCurrentCalc(this.currentCalc);
		    this.shouldShowResult = false;
		  }

		  $scope.erasePrevious = function() {
		  	if(this.shouldShowResult) {
		  		this.currentCalc.result = "";
		  		this.shouldShowResult = false;
		  	}
		  	else if(this.currentCalc.secondNumber.length > 0) 
		  		this.currentCalc.secondNumber = eraseLastDigit(this.currentCalc.secondNumber);
		  	else if(this.currentCalc.operator.length > 0)
		  		this.currentCalc.operator = "";
		  	else
		  		this.currentCalc.firstNumber = eraseLastDigit(this.currentCalc.firstNumber);
		  }

		  /* HELPERS */

		  function isOperatorSet() {
		  	return $scope.currentCalc.operator.length == 1;
		  }

		  function getFirstNumber() {
		  	if($scope.currentCalc.firstNumber == "")
		  		$scope.currentCalc.firstNumber = "0";

		  	return parseInt($scope.currentCalc.firstNumber);
		  }

		  function getSecondNumber() {
		  	if($scope.currentCalc.secondNumber == "")
		  		$scope.currentCalc.secondNumber = getIdentityElement($scope.currentCalc.operator);

		  	return parseInt($scope.currentCalc.secondNumber);
		  }

		  function getIdentityElement(op) {
		  	if(op == "*")
		  		return "1";
		  	
		  	return "0";
		  }

		  function eraseLastDigit(s) {
		  	return s.substring(0, s.length-1);
		  }
	}]);
})(TaqeCalculator);