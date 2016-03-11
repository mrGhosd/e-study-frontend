import template from "./user_status.html";
import UserStatusController from "./UserStatusController";

userStatusDirective.$inject = [];

export default function userStatusDirective() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      user: '='
    },
    template: template,
    bindToController: true,
    controllerAs: "ctrl",
    controller: UserStatusController
  };
}
