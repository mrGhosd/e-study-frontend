export function currentUser($rootScope, WebSockets, PopupMessage, AuthService) {
  let queue = [];
  $rootScope.$on('currentUser', (event, args) => {
    WebSockets.on(`user${args.user.id}chatmessage`, (event, data) => {
      const message = angular.fromJson(data.obj);
      if (!queue.map(message => message.id).includes(message.id)) {
          queue.push(message);

          if (message.user.id !== AuthService.currentUserValue.id){
               PopupMessage.postMessage(message);
          }
      }
    });
  });
}
