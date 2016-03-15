import template from "./autocomplete.html";
import AutocompleteController from "./AutocompleteController";

autocompleteDirective.$inject = [];

export default function autocompleteDirective() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      onChangeInput: '=',
      onChose: '='
    },
    template: template,
    bindToController: true,
    controllerAs: "ctrl",
    controller: AutocompleteController
  };
}
