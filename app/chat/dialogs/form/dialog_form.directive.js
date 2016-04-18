import template from "./dialog_form.html";
import DialogFormController from "./DialogFormController";

dialogFormDirective.$inject = [];

export default function dialogFormDirective() {
  return {
    restrict: "E",
    replace: true,
    scope: {},
    template: template,
    bindToController: true,
    controllerAs: "ctrl",
    controller: DialogFormController,
    link: function($scope, element, attr) {
      
    }
  };
}
