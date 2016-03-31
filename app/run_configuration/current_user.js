export function currentUser($rootScope, WebSockets, PopupMessage, AuthService,
                            $state) {
  let queue = [];
  $rootScope.$on('currentUser', (event, args) => {
    WebSockets.on(`user${args.user.id}chatmessage`, (event, data) => {
      const message = angular.fromJson(data.obj);
      if (!queue.map(message => message.id).includes(message.id)) {
          queue.push(message);

          if (message.user.id !== AuthService.currentUserValue.id &&
              (currentStateIsNotChat($state) &&
              parseInt($state.params.id, 10) !== message.chat.id)){
               PopupMessage.postMessage(message);
          }
      }
    });
  });
}

function currentStateIsNotChat($state) {
  return !$state.current.name.match(/chat/);
}
