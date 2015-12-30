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
    controller: DialogListController
  };
}
