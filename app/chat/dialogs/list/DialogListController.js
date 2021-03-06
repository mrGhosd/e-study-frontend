import Message from 'chat/messages/message.model';
import Chat from 'chat/dialogs/dialog.model.js';
import User from 'users/user.model';

export default class DialogListController {
  constructor($rootScope, $scope, usSpinnerService, $state, DialogFactory,
    WebSockets, AuthService) {
    this.users = [];
    this.$state = $state;
    this.usSpinnerService = usSpinnerService;
    this.chatUsers = [];
    this.defaultChats = this.chats;
    this.$rootScope = $rootScope;
    this.DialogFactory = DialogFactory;
    this.WebSockets = WebSockets;
    this.AuthService = AuthService;
    this.handleSockets();
    this.handleChatSelecting();
    this.createChat = false;
    this.currentUserNotifications = this.AuthService.currentUserValue.notifications.map(item => item.notificationable_id);

    $rootScope.$on('newChatWasCreated', (event, args) => {
      const chat = args.chat;
      this.chats.push(chat);
      this.createChat = false;
      this.chatSelected = chat;
    });
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

  handleChatSelecting() {
    this.$rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState,
      fromParams, error) => {
        if (toState.name === 'chats') {
          this.chatSelected = null;
        }
    });

    if (this.$state.params.id) {
      this.chats.map((chat) => {
        if(chat.id == this.$state.params.id) {
            this.chatSelected = chat;
        }
      });
    }
  }

  searchDialog() {
    if (this.searchField.length >= 1) {
      const params = {
        query: this.searchField
      };
      this.DialogFactory.search(params)
      .then((chats) => {
        this.chats = chats.map(chat => chat.setUsersArrayForUser(this.AuthService.currentUserValue))
      });
    }
    else {
      this.chats = this.defaultChats;
    }
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
        console.log(data);
        this.moveChats(data.obj);
        this.handleNotification(data.notification);
    });
  }

  handleNotification(notification) {
    if (notification) {
      this.$rootScope.$broadcast('currentUserReceiveNotification', { notification });
    }
  }

  moveChats(socketObject) {
    const message = new Message(angular.fromJson(socketObject));
    let chatsIds = this.chats.map(v => v.id);
    const chatIndex = chatsIds.indexOf(message.chatId);
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

  renderCreateChatView() {
    this.createChat = !this.createChat;
  }
}
