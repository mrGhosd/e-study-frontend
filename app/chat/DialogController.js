export default class DialogController {
  constructor($rootScope, ChatFactory) {
    this.ChatFactory = ChatFactory;
    this.rootScope = $rootScope;
    this.currentDialog = null;

    this.rootScope.$on('chatWasSelected', (event, args) => {
      this.ChatFactory.get(args.id)
      .then((response) => {
        console.log(response);
        this.currentDialog = response;
      });
    });
  }

  setDataFromParentController(data) {
    this.currentUser = data.currentUser;
  }
}
