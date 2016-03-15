export default class AutocompleteController {
  constructor($scope) {
    this.$scope = $scope;
    this.text = "";
  }

  handleInput() {
    console.log(this.onChangeInput);
    // this.onChangeInput.call(this, this.text).then((response) => {
    //   console.log(response);
    // });
    // console.log(this.$scope, this.text);
  }
}
