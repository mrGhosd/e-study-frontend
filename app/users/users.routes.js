'use strict';
import User from 'users/user.model'

routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export function routes($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('profile', {
            url: '/profile',
            template: require('./user.html'),
            controller: 'UserController',
            signedIn: true,
            resolve: {
                user: ['AuthService', '$location', '$state', (AuthService, $location, $state) => {
                    return AuthService.currentUser();
                }],
                profile: () => {
                    return true;
                }
            }
        })
        .state('edit_profile', {
            url: '/profile/edit',
            template: require("./form.html"),
            controller: 'UserFormController as profile',
            resolve: {
                user: ['AuthService', (AuthService) =>{
                   return AuthService.currentUser();
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
                AuthService.currentUser().then((data) => {
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
