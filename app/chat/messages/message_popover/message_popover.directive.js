import template from "./message_popover.html";
import MessagePopoverController from "./message_popover.controller";

messagePopoverDirective.$inject = [];

export default function messagePopoverDirective() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      user: "="
    },
    template: template,
    bindToController: true,
    controllerAs: "ctrl",
    controller: MessagePopoverController
  };
}
