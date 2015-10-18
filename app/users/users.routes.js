'use strict';

routes.$inject = ['$stateProvider', '$httpProvider', '$qProvider'];

export function routes($stateProvider, $http, $q) {
    $stateProvider
        .state('users', {
            url: '/users',
            templateUrl: "/users/users.html",
            controller: 'UsersController'
        })
        .state('user', {
            url: '/users/:id',
            templateUrl: '/users/user.html',
            controller: 'UserController',
            resolve: {
                user: ['$http', '$stateParams', 'UserService', ($http, $stateParams, UserService) => {
                    return UserService.getUser($stateParams.id);
                    //return $http.get(`http://localhost:3000/users/${$stateParams.id}.json`);
                    //console.log(UsersService);
                    //return UserService.getUser($stateParams.id);
                }]
            }
        });
}