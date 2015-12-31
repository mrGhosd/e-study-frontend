export default class DialogFormController {
  constructor($rootScope, usSpinnerService, $state, DialogFactory, UserService) {
    this.users = [];
    this.$state = $state;
    this.UserService = UserService;
    this.usSpinnerService = usSpinnerService;
    this.chatUsers = [];
    this.DialogFactory = DialogFactory;
    this.rootScope = $rootScope;
    this.formVisible = false;
  }

  createChat() {
    this.chatUsers.push(this.currentUser);
    let users = this.chatUsers.map((user) => user.id);
    const params = { users, message: this.message };
    this.DialogFactory.create(params)
    .then((response) => {
      this.chatUsers = [];
      this.formVisible = false;
      const dialog = response.setUsersArrayForUser(this.currentUser);
      this.chats.push(dialog);
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

  showForm() {
    this.formVisible  = !this.formVisible ;
  }
}
