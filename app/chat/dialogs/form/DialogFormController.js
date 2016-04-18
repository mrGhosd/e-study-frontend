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

  createChat() {
    this.chatUsers.push(this.currentUser);
    let users = this.chatUsers.map((user) => user.id);
    const params = { users, message: this.message };
    this.DialogFactory.create(params)
    .then((response) => {
      this.chatUsers = [];
      this.formVisible = false;
      const dialog = response.setUsersArrayForUser(this.currentUser);
      this.chats.push(dialog);
    });
  }

  findUser() {
    this.UserService.search(this.$scope.userData)
    .then((response) => {
      console.log(response);
      this.$scope.users = response;
    });
  }
}
