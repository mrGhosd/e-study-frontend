import Message from 'chat/messages/message.model';
import Chat from 'chat/dialogs/dialog.model.js';
import User from 'users/user.model';

export default class DialogListController {
  constructor($rootScope, usSpinnerService, $state, DialogFactory,
    WebSockets, AuthService) {
    this.users = [];
    this.$state = $state;
    this.usSpinnerService = usSpinnerService;
    this.chatUsers = [];
    this.rootScope = $rootScope;
    this.DialogFactory = DialogFactory;
    this.WebSockets = WebSockets;
    this.AuthService = AuthService;
    this.handleSockets();
  }

  setChatList(chat) {
    this.chats = chat.chats.map((chat) => chat.setUsersArrayForUser(this.currentUser));
  }

  selectChat(chat) {
    if (this.$state.params.id != chat.id) {
      this.chatSelected = chat;
      this.$state.go('chats.chat', {id: chat.id});
    }
  }

  searchDialog() {
    this.DialogFactory.search()
    .then((chats) => {
      this.chats = chats.map(chat => chat.setUsersArrayForUser(this.AuthService.currentUserValue))
    });
  }

  destroy(chat, $index) {
    event.preventDefault();
    event.stopPropagation();
    this.DialogFactory.destroy(chat.id)
    .then((response) => {
      if (this.$state.current.name === 'chats.chat') {
        this.$state.go('chats');
      }
      this.chats.splice($index, 1);
    });
  }

  handleSockets() {
    this.WebSockets.on(`user${this.AuthService.currentUserValue.id}chatmessage`,
      (event, data) => {
        this.moveChats(data.obj);
    });
  }

  moveChats(socketObject) {
    const message = new Message(angular.fromJson(socketObject));
    let chatsIds = this.chats.map(v => v.chatId);
    const chatIndex = chatsIds.indexOf(message.chat_id);
    let chat = this.prepareChat(socketObject, message);

    if (chatIndex > -1) {
      this.chats.splice(chatIndex, 1);
    }
    this.chats.unshift(chat);
  }

  prepareChat(socketObject, message) {
    let chat = new Chat(socketObject.chat);
    chat.messages = [message];
    let userIds = chat.users.map(u => u.id);
    const userIndex = userIds.indexOf(this.AuthService.currentUserValue.id);
    if (userIndex > -1) {
      chat.users.splice(userIndex, 1);
    }
    let users = chat.users.map((u) => {
      return new User(u)
    });
    chat.users = users;

    return chat;
  }
}
