import template from "./dialog_form.html";
import DialogFormController from "./DialogFormController";

export default function dialogFormDirective() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      currentUser: '='
    },
    template: template,
    bindToController: true,
    controllerAs: "ctrl",
    controller: DialogFormController
  };
}
