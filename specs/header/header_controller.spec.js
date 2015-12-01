describe("HeaderController", function(){

  var modal = null;
  var httpBackend = null;
  var controller = null;
  var rootScope = null;
  var scope = null;
  var authService = null;

  beforeEach(angular.mock.module('estudy'));

  beforeEach(inject(function($controller, $httpBackend, $rootScope, AuthService, $modal) {
        rootScope = $rootScope;
        httpBackend = $httpBackend;
        scope = rootScope.$new();
        authService = AuthService;
        modal = $modal;
        spyOn(authService, 'isSignedIn');
        spyOn(authService, 'signOut');
        spyOn(modal, 'open');
        controller = $controller('HeaderController', {
          $scope: scope
        });
    }));

  describe("initialization", function(){
    it("show that controller is defined", function() {
      expect(controller).not.toBeUndefined();
    });
  });

  describe("signedIn()", function(){
    it("return signedIn user info", function(){
      controller.signedIn();
      expect(authService.isSignedIn).toHaveBeenCalled();
    });
  });

  describe("logout()", function(){
    it("click on logout button", function(){
      controller.logout();
      expect(authService.signOut).toHaveBeenCalled();
    });
  });

  describe("signIn()", function() {
    it("show sign in modal window after click on button", function() {
      controller.signIn();
      expect(modal.open).toHaveBeenCalled();
    });
  });

  describe("signUp()", function() {
    it("show sign up modal window after click on button", function() {
      controller.signUp();
      expect(modal.open).toHaveBeenCalled();
    });
  });
});
