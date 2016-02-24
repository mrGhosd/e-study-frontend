export default class PopupMessage {
    constructor($modal, $compile, $rootScope, ApiRequest) {
        this.$modal = $modal;
        this.$compile = $compile;
        this.$rootScope = $rootScope;
        this.domElement = null;
        this.ApiRequest = ApiRequest;
    }

    info(message){
        this.postMessage(message, 2500, "message");
    }

    alert(error, time){
        this.postMessage(error, 2500, "error");
    }

    postMessage(message) {
      let template = require('./popup_message.html');
      let newScope = this.$rootScope.$new();
      console.log(message);
      // const title = `${message}.title`;
      // const text = `${message}.text`;
      // newScope.title = title;
      newScope.text = message.text;
      newScope.avatarUrl = this.ApiRequest.urlForAttach(message.user.image.url);
      newScope.time = 1500;
      // newScope.klass = klass;
      this.domElement.append(this.$compile(template)(newScope));
    }

    registerDOM(element) {
      this.domElement = element;
    }
}
