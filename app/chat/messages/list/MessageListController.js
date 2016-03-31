import Message from '../message.model';
import User from 'users/user.model';

export default class MessageListController {
  constructor($scope, $rootScope, DialogFactory, MessageFactory,
    WebSockets, usSpinnerService, AuthService) {
    this.DialogFactory = DialogFactory;
    this.MessageFactory = MessageFactory;
    this.rootScope = $rootScope;
    this.WebSockets = WebSockets;
    this.usSpinnerService = usSpinnerService;
    //need for updating for messages list
    $scope.messages = this.chat.messages.reverse();
    this.userTypingSocket();
    this.newMessageSocket();
  }

  setDataFromParentController(data) {
    this.currentUser = data.currentUser;
  }

  newMessageSocket() {
    this.WebSockets.on(`user${this.currentUser.id}chatmessage`, (event, data) => {
      const message = new Message(angular.fromJson(data.obj));
      if (message.userId !== this.currentUser.id &&
         message.chatId === this.chat.id){
        this.chat.messages.push(message);
      }
    });
  }

  userTypingSocket() {
    this.WebSockets.on(`chat${this.chat.id}usertyping`, (event, data) => {
      const user = new User(angular.fromJson(data.user));
      if (user.id !== this.currentUser.id) {
        console.log(user);
      }
    });
  }
}
