import UsersService from 'users/users.service';

export default class UsersController {
    constructor($scope, users, UserService){
        this.userFactory = UserService;
        this.$scope = $scope;
        $scope.users = users;
        $scope.popoverTemplate = "popover.html";
    }

    search(){
        searchRequest($scope.searchField);
    }

    dynamicSearch(){
        if(this.$scope.searchField !== ""){
            this.searchRequest(this.$scope.searchField);
        } else {
            this.userFactory.getAll().then((data) => {
                this.$scope.users = data;
            });
        }
    }

    searchRequest(request){
        this.userFactory.search(request).then((data) => {
            this.$scope.users = data;
        });
    }
}