export default class UserStatusController {
  constructor($scope, $rootScope) {
    this.$scope = $scope;
    $scope.isOnline = this.user.isOnline();
  }
}
