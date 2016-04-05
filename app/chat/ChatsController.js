export default class ChatsController {
  constructor($scope, chats, currentUser) {
    this.currentUser = currentUser;
    this.chats = chats.map((chat) => chat.setUsersArrayForUser(this.currentUser));
    this.$scope = $scope;
  }

  optionsMenuClick(id) {
    switch(id) {
      case 'search':
        this.showSearchForm = true;
        break;
    }
  }

  disableSearchForm() {
    this.showSearchForm = false;
  }

  searchMessages() {
    const params = {
      query: this.messageSearch
    };
    this.MessageFactory.search(this.chat, params)
    .then((response) => {
      const messages = response.reverse();
      let chat = this.chat;
      chat.messages = messages;
      this.chat = chat;
      console.log(this.chat);
    });
  }
}
