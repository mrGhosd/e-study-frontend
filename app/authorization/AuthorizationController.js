export default class AuthorizationController {
  constructor($scope, $mdDialog) {
    this.$scope = $scope;
    this.$mdDialog = $mdDialog;
  }

  close() {
    this.$mdDialog.cancel();
  }
}
