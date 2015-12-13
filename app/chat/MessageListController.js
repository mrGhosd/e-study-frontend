import Message from './message.model';

export default class MessageListController {
  constructor($scope, $rootScope, ChatFactory, MessageFactory, WebSockets) {
    this.ChatFactory = ChatFactory;
    this.MessageFactory = MessageFactory;
    this.rootScope = $rootScope;
    this.currentDialog = null;
    this.messages = null;
    this.WebSockets = WebSockets;
    this.rootScope.$on('chatWasSelected', (event, args) => {
      this.ChatFactory.get(args.id)
      .then((response) => {
        this.currentDialog = response;
        this.rootScope.$broadcast('messagesListWasReceived');
      });
    });

    this.WebSockets.on('rtchange', (event, data) => {
      const message = new Message(data);
      if (message.userId !== this.currentUser.id){
        this.currentDialog.messages.push(message);
      }
    });
  }

  handleSockets(event, args) {
    // console.log
  }

  setDataFromParentController(data) {
    console.log(data);
    this.currentUser = data.currentUser;
  }

}
