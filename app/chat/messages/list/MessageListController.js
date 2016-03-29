import Message from '../message.model';

export default class MessageListController {
  constructor($scope, $rootScope, DialogFactory, MessageFactory,
    WebSockets, usSpinnerService, AuthService) {
    this.DialogFactory = DialogFactory;
    this.MessageFactory = MessageFactory;
    this.rootScope = $rootScope;
    this.WebSockets = WebSockets;
    this.usSpinnerService = usSpinnerService;
    //need for updating for messages list
    $scope.messages = this.chat.messages;
    this.WebSockets.on(`user${this.currentUser.id}chatmessage`, (event, data) => {
      const message = new Message(angular.fromJson(data.obj));
      console.log(message.userId !== this.currentUser.id && message.chatId === this.chat.id);
      if (message.userId !== this.currentUser.id &&
         message.chatId === this.chat.id){
        this.chat.messages.push(message);
      }
    });
  }

  setDataFromParentController(data) {
    this.currentUser = data.currentUser;
  }
}
