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
    this.$rootScope = $rootScope;
    this.formVisible = false;
    this.$scope.users = [];
    this.parentController = this.$scope.$parent.$parent.ctrl;
    console.log(this.$scope);
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
    const params = { users, message: this.$scope.chatMessage };

    this.DialogFactory.create(params)
    .then(dialog => {
      const chat = dialog.setUsersArrayForUser(this.AuthService.currentUserValue);
      this.$rootScope.$broadcast('newChatWasCreated', {chat: chat});
      this.$state.go('chats.chat', {id: chat.id});
    })
    .catch(error => {
      this.dialogForm.$submitted = true;
      this.dialogForm.$error = error.errors;
      this.dialogForm.$invalid = true;
      console.log(this.dialogForm);
    });
  }
}
