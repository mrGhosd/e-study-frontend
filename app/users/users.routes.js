routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('users', {
            url: '/users',
            templateUrl: require('./users.html'),
            controller: 'UsersController'
        });
}