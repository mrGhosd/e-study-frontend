export default class AutocompleteController {
  constructor($scope, ApiRequest) {
    this.ApiRequest = ApiRequest;
    this.$scope = $scope;
    this.objects = [];
    this.text = "";
  }

  handleInput() {
    console.log(this.text);
    this.onChangeInput.call(this, this.text).then((response) => {
      this.objects = response.data.search;
    });
  }

  select($index) {
    this.onChose(this.objects[$index]);
    this.text = this.objects[$index][this.objectKey];
    this.objects = [];

  }
}
