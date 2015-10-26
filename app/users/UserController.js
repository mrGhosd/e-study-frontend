import UsersService from 'users/users.service';

export default class UserController {
    constructor($scope, $stateParams, $http, $q, user, profile, AuthService){
        $scope.isProfile = profile;
        this.$scope = $scope;
        $scope.user = user;
        this.AuthService = AuthService;
        //const userService = new UsersService($http, $q);
        //userService.getUser($stateParams.id)
        //    .then((response) => {
        //       $scope.user = response;
        //    });
    }
}