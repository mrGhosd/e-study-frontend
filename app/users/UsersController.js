import UsersService from 'users/users.service';

export default class UsersController {
    constructor($scope, users){
        $scope.users = users;
    }
}