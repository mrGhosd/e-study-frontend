'use strict';
import User from 'users/user.model'

routes.$inject = ['$stateProvider', '$httpProvider', '$qProvider'];

export function routes($stateProvider, $http, $q) {
    $stateProvider
        .state('profile', {
            url: '/profile',
            template: require('./user.html'),
            controller: 'UserController',
            resolve: {
                user: ['AuthService', '$location', (AuthService, $location) => {
                    return AuthService.currentUser;
                }],
                profile: () => {
                    return true;
                }
            }
        })
        .state('edit_profile', {
            url: '/profile/edit',
            template: require("./form.html"),
            controller: 'UserFormController',
            resolve: {
                user: ['AuthService', (AuthService) =>{
                   return AuthService.currentUser;
                }]
            }
        })
        .state('users', {
            url: '/users',
            template: require("./users.html"),
            controller: 'UsersController',
            controllerAs: 'usr',
            resolve: {
                users: ['UserService', (UserService) => {
                    return UserService.getAll();
                }]
            }
        })
        .state('user', {
            url: '/users/:id',
            template: require('./user.html'),
            controller: 'UserController',
            onEnter: ['$state', '$stateParams', '$location', 'AuthService', function($state, $stateParams, $location, AuthService) {
                AuthService.currentUser.then((data) => {
                    if(data.id == $stateParams.id) $location.path('/profile').replace("user", new User(data));
                })
            }],
            resolve: {
                user: ['$stateParams', 'UserService', ($stateParams, UserService) => {
                    return UserService.getUser($stateParams.id);
                }],
                profile: () => {
                    return false;
                }
            }
        });
}