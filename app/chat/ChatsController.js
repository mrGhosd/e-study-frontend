export default class ChatsController {
  constructor($scope, chats, currentUser) {
    this.currentUser = currentUser;
    this.chats = chats.map((chat) => chat.setUsersArrayForUser(this.currentUser));
    this.$scope = $scope;
  }
}
