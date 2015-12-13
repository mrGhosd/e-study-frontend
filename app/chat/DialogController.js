import Message from './message.model';

export default class DialogController {
  constructor($rootScope, ChatFactory, MessageFactory, WebSockets) {
    this.ChatFactory = ChatFactory;
    this.MessageFactory = MessageFactory;
    this.rootScope = $rootScope;
    this.currentDialog = null;
    this.WebSockets = WebSockets;
    this.rootScope.$on('chatWasSelected', (event, args) => {
      this.ChatFactory.get(args.id)
      .then((response) => {
        this.currentDialog = response;
      });
    });

    this.WebSockets.on('rtchange', (event, data) => {
      const message = new Message(data);
      this.currentDialog.messages.push(message);
    });
  }

  handleSockets(event, args) {
    // console.log
  }

  setDataFromParentController(data) {
    this.currentUser = data.currentUser;
  }

  createMessage() {
    const message = {
      message: {
        user_id: this.currentUser.id,
        chat_id: this.currentDialog.id,
        text: this.message
      }
    };

    this.MessageFactory.create(message)
    .then((message) => {
      this.message = '';
      this.currentDialog.messages.push(message);
    });

  }
}
