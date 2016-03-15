export default class AutocompleteController {
  constructor($scope, ApiRequest) {
    this.ApiRequest = ApiRequest;
    this.$scope = $scope;
    this.text = "";
    this.objects = [];
  }

  handleInput() {
    if (this.onChangeInput !== null) {
      this.onChangeInput.call(this, this.text).then((response) => {
        this.objects = response.data.search;
      });
    }
  }

  select($index) {
    this.onChose(this.objects[$index]);
  }
}
