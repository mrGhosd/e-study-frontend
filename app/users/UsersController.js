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

    sendMessage(user) {
      const message = {
        message: {
          user_id: this.AuthService.currentUserValue.id,
          text: this.short_message,
          users: [user.id, this.AuthService.currentUserValue.id]
        }
      };

      this.MessageFactory.create(message)
      .then((message) => {
        console.log(message);
        this.$state.go('chats.chat', {id: message.chatId});
      })
      .catch((errors) => {
        console.log(errors);
      });
    }
}
