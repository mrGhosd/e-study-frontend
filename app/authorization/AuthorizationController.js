import { getBrowserName, getOSName, getBrowserVersion, getOSVersion } from 'util/browser';
export default class AuthorizationController {
  constructor($scope, $q, $mdDialog, CountryService, AuthService) {
    this.$q = $q;
    this.$scope = $scope;
    this.$mdDialog = $mdDialog;
    this.CountryService = CountryService;
    this.AuthService = AuthService;
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
    const params = {
      country: this.selectedCountry.id,
      phone_code: this.selectedPhone.phone_code,
      phone: this.phoneNumber
    };
    this.AuthService.setPhone(params)
    .then(() => {
      this.isFirstStep = false;
      this.isLoading = false;
    });
  }

  searchData(query) {
    let def = this.$q.defer();
    this.CountryService.search(query).then((response) => {
      def.resolve(response);
    });
    return def.promise;
  }

  authorize() {
    const browser = {
      app_name: getBrowserName(),
      app_version: getBrowserVersion(),
      platform: getOSName(),
      platform_version: getOSVersion()
    };
  }
}
