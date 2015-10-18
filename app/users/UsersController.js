import UsersService from 'users/users.service';

export default class UsersController {
    constructor($scope, $http, $q){
        this.users = [];
        this.userFactory = new UsersService($http, $q);
        this.userFactory.getAll()
            .then((response) => {
                $scope.users = this.users = response;
            });
    }
}