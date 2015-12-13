export default class DialogController {
  constructor($rootScope, ChatFactory, MessageFactory) {
    this.ChatFactory = ChatFactory;
    this.MessageFactory = MessageFactory;
    this.rootScope = $rootScope;
    this.currentDialog = null;

    this.rootScope.$on('chatWasSelected', (event, args) => {
      this.ChatFactory.get(args.id)
      .then((response) => {
        this.currentDialog = response;
        console.log(this.currentDialog);
      });
    });
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
      console.log(message);
      this.currentDialog.messages.push(message);
    });

  }
}
