export default class DialogController {
  constructor($rootScope) {
    this.rootScope = $rootScope;
    this.rootScope.$on('chatWasSelected', (event, args) => {
      console.log(args);
    });
  }
}
