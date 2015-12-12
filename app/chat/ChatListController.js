export default class ChatListController {
  constructor($scope, chats, UserService, currentUser, ChatFactory) {
    this.currentUser = currentUser;
    this.chats = chats.map((chat) => chat.setUsersArrayForUser(this.currentUser));
    this.users = [];
    this.chatUsers = [];
    this.UserService = UserService;
    this.$scope = $scope;
    this.$scope.selected = undefined;
    this.selectedUser = null;
    this.ChatFactory = ChatFactory;
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

  selectUser($item, $model, $label) {
    let elementIsUniq = true;
    for(const item of this.chatUsers) {
      if (item.id === $model.id) {
        elementIsUniq = false;
      }
    }
    if (elementIsUniq){
      this.chatUsers.push($model);
    }
    this.selectedUser = null;
  }

  removeNewMember($index) {
    this.chatUsers.splice($index, 1);
  }

  createChat() {
    this.chatUsers.push(this.currentUser.id);
    let users = this.chatUsers.map((user) => user.id);
    const params = { users };
    this.ChatFactory.create(params)
    .then((response) => {
      console.log(response);
    });
  }

  testAction() {
    console.log("3");
  }
}
