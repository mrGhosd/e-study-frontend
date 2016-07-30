import UsersService from 'users/users.service';

export default class UsersController {
    constructor($scope, $state, users, UserService, MessageFactory, AuthService){
        this.userFactory = UserService;
        this.$scope = $scope;
        this.AuthService = AuthService;
        this.MessageFactory = MessageFactory;
        this.$state = $state;
        $scope.users = users;
        $scope.popoverTemplate = "/users/popover.html";
        this.canLoadMore = false;
        this.page = this.userFactory.defaultPage;
        this.lastRequest;
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

    loadMore() {
      if (this.lastRequest && this.lastRequest.length === 0)  {
        return;
      }

      this.userFactory.getAll(++this.page)
      .then(response => {
        this.lastRequest = response;
        response.map(item => {
          this.$scope.users.push(item);
        });
        console.log(response);
      });
    }
}
