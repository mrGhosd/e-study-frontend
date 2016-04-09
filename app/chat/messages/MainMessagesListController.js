export default class MainMessagesListController {
  constructor($scope, chat, currentUser, MessageFactory) {
    this.$scope = $scope;
    this.chat = this.$scope.chat = chat;
    this.defaultChat = angular.copy(this.chat);
    this.messages = this.$scope.messages = chat.messages.reverse();
    this.currentUser = currentUser;
    this.MessageFactory = MessageFactory;
    this.showSearchForm = false;
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
    this.$scope.chat = this.defaultChat;
    this.$scope.messages = this.defaultChat.messages.reverse();
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
      this.chat = this.$scope.chat = chat;
      this.messages = this.$scope.messages = messages.reverse();
    });
  }
}
