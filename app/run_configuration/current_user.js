export function currentUser($rootScope, WebSockets, PopupMessage, AuthService) {
  $rootScope.$on('currentUser', (event, args) => {
    WebSockets.on(`user${args.user.id}chatmessage`, (event, data) => {
      const message = angular.fromJson(data.obj);
      if (message.user.id !== AuthService.currentUserValue.id){
           PopupMessage.postMessage(message);
      }
    });
  });
}
