var TaqeCalculator = angular.module('TaqeCalculator', ['ngMaterial', 'ngAnimate', 'ngMessages', 'ngAria', 'ui.router', 'calculator.services']);

(function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', '$compileProvider',  function($stateProvider, $urlRouterProvider, $compileProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('calculator', {
            url: '/',
            templateUrl: 'partials/calculator-partial.html',
            controller: 'CalculatorController'
        })

        .state('history', {
            url: '/history',
            templateUrl: 'partials/history-partial.html',
            controller: 'HistoryController'
        });

        $compileProvider.preAssignBindingsEnabled(true);
    }]);
})(TaqeCalculator);
