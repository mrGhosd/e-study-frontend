export default class DialogFormController {
  constructor($scope, $rootScope, AuthService, usSpinnerService, $state, DialogFactory, UserService) {
    this.users = [];
    this.$state = $state;
    this.$scope = $scope;
    this.UserService = UserService;
    this.AuthService = AuthService;
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

  createChat() {
    const users = this.$scope.invitedUsers.map(user => user.id);
    const params = { users };
    this.DialogFactory.create(params)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }
}
