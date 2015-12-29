import Message from '../message.model';

export default class MessageListController {
  constructor($scope, $rootScope, DialogFactory, MessageFactory,
    WebSockets, usSpinnerService) {
    this.DialogFactory = DialogFactory;
    this.MessageFactory = MessageFactory;
    this.rootScope = $rootScope;
    this.WebSockets = WebSockets;
    this.usSpinnerService = usSpinnerService;
    //need for updating for messages list
    $scope.messages = this.chat.messages;
    console.log(this.chat.messages);

    this.usSpinnerService.stop('load-messages-spinner');
    this.WebSockets.on('rtchange', (event, data) => {
      const message = new Message(data);
      if (message.userId !== this.currentUser.id){
        this.chat.messages.push(message);
      }
    });
  }

  setDataFromParentController(data) {
    this.currentUser = data.currentUser;
  }
}
