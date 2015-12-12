routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export function routes($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('chats', {
            url: '/chats',
            template: require('./chats.html'),
            controller: 'ChatListController as chat',
            resolve: {
                currentUser: ['AuthService', (AuthService) => {
                  return AuthService.currentUser();
                }],
                chats: ['ChatFactory', (ChatFactory) => {
                    return ChatFactory.getAll();
                }]
            },
        })
}
