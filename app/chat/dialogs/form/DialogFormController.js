export default class DialogFormController {
  constructor($rootScope, usSpinnerService, $state, ChatFactory) {
    this.users = [];
    this.$state = $state;
    this.usSpinnerService = usSpinnerService;
    this.chatUsers = [];
    this.ChatFactory = ChatFactory;
    this.rootScope = $rootScope;
  }

  createChat() {
    this.chatUsers.push(this.currentUser.id);
    let users = this.chatUsers.map((user) => user.id);
    const params = { users };
    this.ChatFactory.create(params)
    .then((response) => {
      console.log(response);
    });
  }

  selectUser($item, $model, $label) {
    let elementIsUniq = true;
    for(const item of this.chatUsers) {
      if (item.id === $model.id) {
        elementIsUniq = false;
      }
    }
    if (elementIsUniq){
      this.chatUsers.push($model);
    }
    this.selectedUser = null;
  }

  removeNewMember($index) {
    this.chatUsers.splice($index, 1);
  }

  changeInputValue() {
    this.UserService.search(this.selectedUser)
    .then((response) => {
      response.map((user, idx) => {
        user.fullName = user.correctNaming();
      });
      this.users = response;
    });
  }
}
