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
                chats: ['DialogFactory', (DialogFactory) => {
                    return DialogFactory.getAll();
                }]
            },
        })
        .state('chats.chat', {
          url: '/:id',
          template: require('./messages/messages.html'),
          resolve: {
            chat: ['DialogFactory', '$stateParams', (DialogFactory, $stateParams) => {
              return DialogFactory.get($stateParams.id);
            }]
          },
          controller: 'MainMessagesListController as ctrl'
        })
}
