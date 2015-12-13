export default class MessageFormController {
  constructor($scope, $rootScope, ChatFactory, MessageFactory) {
    this.showForm = false;
    this.MessageFactory = MessageFactory;
    this.currentDialog = null;
    $rootScope.$on('messagesListWasReceived', (event, args) => {
      console.log(args);
      this.currentDialog = args;
      this.showForm = true;
    });
  }

  setDataFromParentController(data) {
    this.currentUser = data.currentUser;
    this.currentDialog = data.currentDialog;
  }

  createMessage() {
    const message = {
      message: {
        user_id: this.currentUser.id,
        chat_id: this.currentDialog.id,
        text: this.message
      }
    };

    console.log(message);

    this.MessageFactory.create(message)
    .then((message) => {
      this.message = '';
      this.currentDialog.messages.push(message);
    })
    .catch((errors) => {
      console.log(errors);
    });

  }

  setData(chat) {
    console.log(chat);
  }
}
