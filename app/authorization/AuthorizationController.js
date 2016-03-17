import { getBrowserName } from 'util/browser';
export default class AuthorizationController {
  constructor($scope, $q, $mdDialog, CountryService) {
    this.$q = $q;
    this.$scope = $scope;
    this.$mdDialog = $mdDialog;
    this.CountryService = CountryService;
    this.isFirstStep = true;
    this.isLoading = false;
  }

  close() {
    this.$mdDialog.cancel();
  }

  querySearch(query) {
    return this.searchData(query);
  }

  searchByPhone(query) {
    return this.searchData(query);
  }

  selectedItemChange(item) {
    this.selectedCountry = this.selectedPhone = item;
  }

  nextStep() {
    this.isLoading = true;
    this.isFirstStep = false;
    console.log(getBrowserName());
  }

  searchData(query) {
    let def = this.$q.defer();
    this.CountryService.search(query).then((response) => {
      def.resolve(response);
    });
    return def.promise;
  }
}
