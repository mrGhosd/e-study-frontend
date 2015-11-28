describe('notificationMessage', function() {
  var compile = null;
  var $scope = null;
  var directiveElem = null;
  var element = null;
  var messageElem = null;
  var compileMessage = null;

  beforeEach(angular.mock.module('estudy'));

  beforeEach(inject(function($compile, $rootScope){
      $scope = $rootScope.$new();
      element = angular.element("<div class=\"notification-bar\"></div>");
      messageElem = angular.element("<div class=\"notification-message\"><div class=\"header\">Заголовок</div></div>")
      element.append(messageElem);
      directiveElem = $compile(element)($scope);
      $scope.$digest();
    })
  );

  it ("doesn't equal undefined", function() {
    expect(messageElem.html()).not.toEqual("");
  });

  it ("close message after click on cross", function() {
    var cross = directiveElem.find("a");
    cross.triggerHandler('click');
    $scope.$digest();
    expect(directiveElem.html()).toEqual("");
  });
});
