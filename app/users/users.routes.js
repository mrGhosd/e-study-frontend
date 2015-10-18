'use strict';

routes.$inject = ['$stateProvider', '$httpProvider', '$qProvider'];

export function routes($stateProvider, $http, $q) {
    $stateProvider
        .state('users', {
            url: '/users',
            template: require("./users.html"),
            controller: 'UsersController',
            resolve: {
                users: ['UserService', (UserService) =>{
                    return UserService.getAll();
                }]
            }
        })
        .state('user', {
            url: '/users/:id',
            template: require('./user.html'),
            controller: 'UserController',
            resolve: {
                user: ['$stateParams', 'UserService', ($stateParams, UserService) => {
                    return UserService.getUser($stateParams.id);
                }]
            }
        });
}