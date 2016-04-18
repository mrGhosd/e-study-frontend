import template from "./dialog_form.html";
import DialogFormController from "./DialogFormController";

dialogFormDirective.$inject = ['$compile'];

export default function dialogFormDirective($compile) {
  return {
    restrict: "E",
    replace: true,
    scope: {},
    template: template,
    bindToController: true,
    controllerAs: "ctrl",
    controller: DialogFormController,
    link: function($scope, element, attr) {
      let dialogUsers = angular.element(element[0].querySelector('.new-dialog-users'));

      $scope.createChat = function(user) {
        var newMember = angular.element("<div class='new-dialog-item'>" + user.correctNaming() + "<a ng-click='removeFromList()'>x</a></div>");
        dialogUsers.append(newMember);
        $compile(newMember)($scope);
      }

      $scope.removeFromList = function(user) {
        var items = angular.element(element[0].querySelector('.new-dialog-item'));

      }
    }
  };
}
