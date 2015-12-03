describe("AuthorizationController", function() {
  var modal = null;
  var httpBackend = null;
  var controller = null;
  var rootScope = null;
  var scope = null;
  var authService = null;
  var modalInstance = {};
  var currentForm = {};
  var authForm = {email: 'test@example.com', password: "12345"};
  var regForm = {email: 'test@example.com', password: "12345", password_confirmation: "12345"};
  var qService = null;
  var timeout = null;
  var signInUser = null;

  beforeEach(angular.mock.module('estudy'));

  beforeEach(inject(function($controller, $httpBackend, $rootScope, AuthService, $modal, $q, $timeout) {
        rootScope = $rootScope;
        httpBackend = $httpBackend;
        scope = rootScope.$new();
        authService = AuthService;
        modal = $modal;
        qService = $q;
        modalInstance = modal.open({
          template: "<div></div>",
          controller: 'AuthorizationController as modalView',
          resolve: {
            currentTab: function() {
              return 'auth';
            }
          }
         });
        spyOn(modalInstance, 'dismiss');
        timeout = $timeout;
        controller = $controller('AuthorizationController', {
          $scope: scope,
          $modalInstance: modalInstance,
          authService: authService,
          currentTab: 'auth',
          regForm: regForm,
          authForm: authForm
        });
    }));

    describe("cancel()", function() {
      it("close and remove modal window", function() {
        controller.cancel();
        expect(modalInstance.dismiss).toHaveBeenCalled();
      });
    });

    describe("defineCurrentForm()", function(){
      it("set current visible form as auth form", function(){
        controller.authForm = authForm;
        controller.defineCurrentForm();
        expect(controller.modalView.currentForm).toEqual(authForm);
      });
    });

    describe("setCurrentViewDetails()", function(){
      describe("for auth view", function() {
        beforeEach(function(){
          controller.setCurrentViewDetails("auth", authForm);
        });

        it("check the title value", function() {
          expect(controller.modalTitle).toEqual("auth");
        });

        it("check the currentFormValue", function() {
          expect(controller.modalView.currentForm).toEqual(authForm);
        });
      });

      describe("for reg view", function() {
        beforeEach(function(){
          controller.setCurrentViewDetails("reg", regForm);
        });

        it("check the title value", function() {
          expect(controller.modalTitle).toEqual("reg");
        });

        it("check the currentFormValue", function() {
          expect(controller.modalView.currentForm).toEqual(regForm);
        });
      })
    });

    describe("login()", function() {
      beforeEach(function() {
        signInUser = httpBackend.whenPOST("http://localhost:3000/api/sessions");
      });


      it("call authService login method", function() {
        spyOn(authService, 'login').and.returnValue(qService.when({token: 12345}));
        controller.authForm = authForm;
        controller.defineCurrentForm();
        controller.login();
        expect(authService.login).toHaveBeenCalled();
      });

      it("expect response to authorization", function() {
        httpBackend.expectPOST("http://localhost:3000/api/sessions");
      });

      describe("with valid attributes", function() {
        beforeEach(function() {
          spyOn(authService, 'login').and.returnValue(qService.when({token: 12345}));
          controller.authForm = authForm;
          controller.defineCurrentForm();
          controller.login();
        });

        it("dismiss window after success sign in", function() {
          signInUser.respond(200, {token: 12345});
          rootScope.$digest();
          expect(modalInstance.dismiss).toHaveBeenCalled();
        });

      });

      describe("with invalid attributes", function() {
        var errors = {email: "can't be empty"};
        beforeEach(function() {
          spyOn(authService, 'login').and.returnValue(qService.reject(errors));
          var newScope = rootScope.$new();
          controller.authForm = {email: "", password: ""};
          controller.defineCurrentForm();
          controller.login();
        });

        it("dismiss window after success sign in", function() {
          signInUser.respond(422, errors);
          rootScope.$digest();
          expect(controller.authForm.$errors).toEqual(errors);
        });

      })
    });
});
