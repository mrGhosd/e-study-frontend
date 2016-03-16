export default class AuthorizationController {
  constructor($scope, $q, $mdDialog, CountryService) {
    this.$q = $q;
    this.$scope = $scope;
    this.$mdDialog = $mdDialog;
    this.CountryService = CountryService;
  }

  close() {
    this.$mdDialog.cancel();
  }

  querySearch(query) {
    let def = this.$q.defer();
    this.CountryService.search(query).then((response) => {
      def.resolve(response);
    });
    return def.promise;
  }

  selectedItemChange(item) {
    this.selectedCountry = item;
  }
}
