export default class Notification {
    constructor($modal, $compile, $rootScope) {
        this.$modal = $modal;
        this.$compile = $compile;
        this.$rootScope = $rootScope;
        this.domElement = null;
    }

    info(message){
        this.postMessage(message, 2500, "message");
    }

    alert(error, time){
        this.postMessage(error, 2500, "error");
    }

    postMessage(message, time, klass) {
      let template = require('./notification_view.html');
      let newScope = this.$rootScope.$new();
      const title = `${message}.title`;
      const text = `${message}.text`;
      newScope.title = title;
      newScope.text = text;
      newScope.time = time;
      newScope.klass = klass;
      this.domElement.append(this.$compile(template)(newScope));
    }

    registerDOM(element) {
      this.domElement = element;
    }
}
