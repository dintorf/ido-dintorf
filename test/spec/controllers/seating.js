'use strict';

describe('Controller: SeatingCtrl', function () {

  // load the controller's module
  beforeEach(module('idodintorfcomApp'));

  var SeatingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SeatingCtrl = $controller('SeatingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
