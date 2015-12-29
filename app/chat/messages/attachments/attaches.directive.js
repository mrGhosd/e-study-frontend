import template from "./attachment.html";
import AttachesController from "./attaches.controller";

attachesDiretive.$inject = [];

export default function attachesDiretive() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      attach: "="
    },
    template: template,
    bindToController: true,
    controllerAs: "ctrl",
    controller: AttachesController
  };
}
