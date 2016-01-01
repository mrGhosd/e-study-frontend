import template from "./message_form.html";
import MessageFormController from "./MessageFormController";

messageFormDirective.$inject = [];

export default function messageFormDirective() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      currentUser: '=',
      chat: "=",
      errors: "=",
      message: "="
    },
    template: template,
    bindToController: true,
    controllerAs: "ctrl",
    controller: MessageFormController,
    link: function(scope, element) {
      $(element).find('.textarea-data').focus();
    }
  };
}
