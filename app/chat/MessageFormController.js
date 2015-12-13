export default class MessageFormController {
  constructor($rootScope, ChatFactory, MessageFactory) {

  }

  setDataFromParentController(data) {
    this.currentUser = data.currentUser;
    this.currentDialog = data.currentDialog;
  }

  reateMessage() {
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
    })
    .catch((errors) => {
      console.log(errors);
    });

  }
}
