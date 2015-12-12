export default class ChatListController {
  constructor($rootScope) {
    this.users = [];
    this.chatUsers = [];
    this.rootScope = $rootScope;
  }

  setChatList(chat) {
    this.currentUser = chat.currentUser;
    this.chats = chat.chats.map((chat) => chat.setUsersArrayForUser(this.currentUser));
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

  selectChat(chat) {
    this.rootScope.$broadcast('chatWasSelected', chat);
  }
}
