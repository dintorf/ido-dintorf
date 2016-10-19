'use strict';

/**
 * @ngdoc function
 * @name idodintorfcomApp.controller:SeatingCtrl
 * @description
 * # SeatingCtrl
 * Controller of the idodintorfcomApp
 */
angular.module('idodintorfcomApp')
  .controller('SeatingCtrl', function ($scope, $http) {
    $http.get('scripts/seating-chart.json').success(function(data) {
      $scope.seating = data;
    });
  });
