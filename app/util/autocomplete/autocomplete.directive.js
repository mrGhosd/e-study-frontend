import template from "./autocomplete.html";
import AutocompleteController from "./AutocompleteController";

autocompleteDirective.$inject = [];

export default function autocompleteDirective() {
  return {
    restrict: "E",
    replace: true,
    scope: {
      onChangeInput: '=',
      onChose: '=',
      objectKey: '='
    },
    template: template,
    bindToController: true,
    controller: AutocompleteController,
    controllerAs: "ctrl"
  };
}
