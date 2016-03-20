import { getBrowserName, getOSName, getBrowserVersion, getOSVersion } from 'util/browser';

let selectedTab;

export default class AuthorizationController {
  constructor($scope, $q, $mdDialog, CountryService, AuthService) {
    this.$q = $q;
    this.$scope = $scope;
    this.$mdDialog = $mdDialog;
    this.CountryService = CountryService;
    this.AuthService = AuthService;
    this.isFirstStep = true;
    this.isLoading = false;
    this.errors = this.userInfo = {};
    // this.tab = this.auth.tab;
    if (this.tab) {
      selectedTab = this.tab;
      $scope.tab = selectedTab;
    }
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
    .then((response) => {
      this.isFirstStep = false;
      this.isLoading = false;
      this.userInfo = response.data.user;
      console.log(this.userInfo);
    })
    .catch((response) => {
      this.isLoading = false;
      this.phoneCodeForm.$error = response.data.errors;
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
