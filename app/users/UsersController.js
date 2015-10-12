import UsersService from 'users/users.service';

export default class UsersController {
    constructor($http, $q){
        this.userFactory = new UsersService($http, $q);
        console.log(this.userFactory.getAll());
    }
}