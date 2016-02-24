export default function ($rootScope, WebSockets) {
  $rootScope.$on('currentUser', (event, args) => {
    WebSockets.on(`user${args.user.id}chatmessage`, (event, data) => {
      console.log(data);
      // const message = new Message(angular.fromJson(data.obj));
      // if (message.userId !== this.currentUser.id &&
      //    message.chatId === this.chat.id){
      //   this.chat.messages.push(message);
      // }
    });
  });
}
