import template from "./dialog_list.html";
import DialogListController from "./DialogListController";

dialogListDirective.$inject = [];

export default function dialogListDirective() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      chats: '='
    },
    template: template,
    bindToController: true,
    controllerAs: "ctrl",
    controller: DialogListController,
    link: function($scope, element, attrs) {
      $scope.$watch('ctrl.createChat', function(newVal) {
        var button = angular.element(element[0].getElementsByClassName('toggleDialogForm'));
        if (newVal) {
          button.text('x');
        }
        else {
          button.text('+');
        }
      });
    }
  };
}
