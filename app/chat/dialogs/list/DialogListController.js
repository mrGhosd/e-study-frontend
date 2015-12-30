export default class DialogListController {
  constructor($rootScope, usSpinnerService, $state, DialogFactory) {
    this.users = [];
    this.$state = $state;
    this.usSpinnerService = usSpinnerService;
    this.chatUsers = [];
    this.rootScope = $rootScope;
    this.DialogFactory = DialogFactory;
    this.rootScope.$on('messagesListWasReceived', () => {
      this.usSpinnerService.stop('load-messages-spinner');
    });
  }

  setChatList(chat) {
    this.currentUser = chat.currentUser;
    this.chats = chat.chats.map((chat) => chat.setUsersArrayForUser(this.currentUser));
  }

  selectChat(chat) {
    if (this.$state.params.id != chat.id) {
      this.usSpinnerService.spin('load-messages-spinner');
      this.$state.go('chats.chat', {id: chat.id});
    }
  }

  destroy(chat, $index) {
    event.preventDefault();
    event.stopPropagation();
    this.DialogFactory.destroy(chat.id)
    .then((response) => {
      this.chats.splice($index, 1);
    });
  }
}
