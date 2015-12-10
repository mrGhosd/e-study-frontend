describe("AuthService", function() {
  beforeEach(angular.mock.module('estudy'));

  var httpBackend = null;
  var localStorage = null;
  var sessionStorage = null;
  var authService = null;
  var apiRequest = null;
  var qService = null;
  var rootScope = null;
  var UserClass = null;

  beforeEach(inject(function(AuthService, ApiRequest, $httpBackend, $sessionStorage,
    $localStorage, $q, $rootScope) {
      authService = AuthService;
      httpBackend = $httpBackend;
      apiRequest = ApiRequest;
      localStorage = $localStorage;
      sessionStorage = $sessionStorage;
      qService = $q;
      rootScope = $rootScope;
  }));

  describe("isSignedIn", function() {
    describe("token exists", function() {
      beforeEach(function() {
        sessionStorage.remember_token = "12345";
        localStorage.remember_token  = "12345";
      });

      it("return true", function() {
        expect(authService.isSignedIn()).toEqual(true);
      });
    });

    describe("token doesn't exists", function() {
      it("return false", function() {
        expect(authService.isSignedIn()).toEqual(false);
      });
    })
  });

  describe("currentUser", function() {
    var currentUserResponse = null;
    var successResponse = {user: {id: 1, first_name: "111"}};

    beforeEach(function(){
      currentUserResponse = httpBackend.whenGET("http://localhost:3000/api/sessions/current");
    });

    describe("current user exists", function() {
      var userObject = successResponse;
      var serverUser = null;

      it("return current user object", function() {
        currentUserResponse.respond(200, successResponse);
        authService.currentUser().then(function(response) {
          serverUser = response;
        });
        httpBackend.flush();
        expect(serverUser.constructor.name).toEqual("User");
      });
    });
  });
});
