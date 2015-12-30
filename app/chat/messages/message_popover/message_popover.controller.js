export default class MessagePopoverController {
  constructor($scope, $state, AuthService, MessageFactory) {
    this.$scope = $scope;
    this.$state = $state;
    this.AuthService = AuthService;
    this.MessageFactory = MessageFactory;
    $scope.popoverTemplate = "/users/popover.html";
  }

  sendMessage(user) {
    const message = {
      message: {
        user_id: this.AuthService.currentUserValue.id,
        text: this.short_message,
        users: [this.user.id, this.AuthService.currentUserValue.id]
      }
    };

    this.MessageFactory.create(message)
    .then((message) => {
      this.$state.go('chats.chat', {id: message.chatId});
    })
    .catch((errors) => {
      console.log(errors);
    });
  }
}
