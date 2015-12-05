describe("NavigationController", function() {
  beforeEach(angular.mock.module('estudy'));
  beforeEach(angular.mock.module('estudy.users'));

  var controller = null;
  var state = null;
  var rootScope = null;
  var httpBackend = null;

  beforeEach(inject(function($controller, $state, $rootScope, $httpBackend) {
    state = $state;
    httpBackend = $httpBackend;
    rootScope = $rootScope;
    controller = $controller('NavigationController', {
      $state: state
    });
  }));

  describe("isActive", function() {
    beforeEach(function(){
      httpBackend.whenGET("http://localhost:3000/api/sessions/current").respond(200, {id: 1, first_name: "aaa"});
      state.go('home');
      rootScope.$digest();
    });

    it("current path is equal to item path", function() {
      expect(controller.isActive('/')).toEqual(true);
    });

    it("current path is not equal to item path", function() {
      expect(controller.isActive('/profile')).toEqual(false);
    });
  });
});
