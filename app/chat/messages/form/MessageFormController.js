export default class MessageFormController {
  constructor($scope, $rootScope, ChatFactory, MessageFactory) {
    this.MessageFactory = MessageFactory;
  }

  createMessage() {
    const message = {
      message: {
        user_id: this.currentUser.id,
        chat_id: this.chat.id,
        text: this.message
      }
    };

    this.MessageFactory.create(message)
    .then((message) => {
      this.message = '';
      this.chat.messages.push(message);
    })
    .catch((errors) => {
      console.log(errors);
    });

  }
}
