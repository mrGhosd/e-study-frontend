routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export function routes($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('chats', {
            url: '/chats',
            template: require('./chats.html'),
            controller: 'ChatsController as chat',
            resolve: {
                currentUser: ['AuthService', (AuthService) => {
                  return AuthService.currentUser();
                }],
                chats: ['ChatFactory', (ChatFactory) => {
                    return ChatFactory.getAll();
                }]
            },
        })
        .state('chats.chat', {
          url: '/:id',
          template: require('./dialog_window.html'),
          resolve: {
            chat: ['ChatFactory', '$stateParams', (ChatFactory, $stateParams) => {
              return ChatFactory.get($stateParams.id);
            }]
          },
          controller: ($scope, chat, currentUser) => {
              $scope.chat = chat;
              $scope.currentUser = currentUser;
          }

        })
}
