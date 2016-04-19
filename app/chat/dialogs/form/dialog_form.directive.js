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
      $scope.invitedUsers = [];

      $scope.addPerson = function(user) {
        $scope.invitedUsers.push(user);
      }

      $scope.removeUser = function(index) {
        $scope.invitedUsers.splice(index, 1);
      }
    }
  };
}
