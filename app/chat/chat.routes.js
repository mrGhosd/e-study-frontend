'use strict';

routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export function routes($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('chats', {
            url: '/chats',
            template: require('./chats.html'),
            controller: 'ChatListController as chat',
            signedIn: true,
            resolve: {
                users: ['UserService', (UserService) => {
                    return UserService.getAll();
                }]
            }
        })
}
