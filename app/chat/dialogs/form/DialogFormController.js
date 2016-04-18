export default class DialogFormController {
  constructor($scope, $rootScope, usSpinnerService, $state, DialogFactory, UserService) {
    this.users = [];
    this.$state = $state;
    this.$scope = $scope;
    this.UserService = UserService;
    this.usSpinnerService = usSpinnerService;
    this.chatUsers = [];
    this.DialogFactory = DialogFactory;
    this.rootScope = $rootScope;
    this.formVisible = false;
    this.$scope.users = [];
  }

  findUser() {
    let searchStr = this.$scope.userData.replace(/<(?:.|\n)*?>/g, "");
    console.log(searchStr);
    this.UserService.search(searchStr)
    .then((response) => {
      this.$scope.users = response;
    });
  }
}
