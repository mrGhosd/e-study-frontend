export default class AutocompleteController {
  constructor($scope) {
    this.$scope = $scope;
    this.text = "";
  }

  handleInput() {
    console.log(this);
    console.log(this.text);
  }
}
