import UserService from 'users/users.service'

routes.$inject = ['$stateProvider', '$httpProvider', '$qProvider'];

export default function routes($stateProvider, $http, $q) {
    const userService = new UserService($http, $q);
    $stateProvider
        .state('users', {
            url: '/users',
            templateUrl: require('./users.html'),
            controller: 'UsersController as userCtrl'
        })
        .state('user', {
            url: '/users/:id',
            templateUrl: require('./user.html'),
            controller: 'UserController as userCtrl'
        });
}