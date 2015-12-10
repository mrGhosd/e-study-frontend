export default class ChatListController {
  constructor($scope, chats, UserService) {
    this.chats = chats;
    this.users = [];
    this.UserService = UserService;
    this.$scope = $scope;
    this.$scope.selected = undefined;
  }

  changeInputValue() {
    this.UserService.search(this.selectedUser)
    .then((response) => {
      response.map((user, idx) => {
        user.fullName = user.correctNaming();
      });
      this.users = response;
    });
  }

  selectUserEvent() {
    console.log(this.selectedUser);
  }

  selectUser($item, $model, $label) {
    console.log($item, $model, $label);
  }
}
