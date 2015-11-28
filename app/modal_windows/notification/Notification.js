export default class Notification {
    constructor($modal, $compile, $rootScope) {
        this.$modal = $modal;
        this.$compile = $compile;
        this.$rootScope = $rootScope;
        this.domElement = null;
    }

    info(message){
        this.showModal(message, "message");
    }

    alert(error){
        this.showModal(error, "error");
    }

    postMessage(message, time, klass) {
      let template = require('./test_directive.html');
      let newScope = this.$rootScope.$new();
      const title = `${message}.title`;
      const text = `${message}.text`;
      newScope.title = title;
      newScope.text = text;
      this.domElement.append(this.$compile(template)(newScope));
    }

    registerDOM(element) {
      this.domElement = element;
    }

    showModal(message, type){
        const modalWindow = this.$modal.open({
            animation: true,
            template: require('./notification_modal.html'),
            controller: 'NotificationsController as modal',
            resolve: {
                message: () => {
                    return message;
                },
                type: () => {
                    return type;
                }
            }
        });
        setTimeout(() => {
            modalWindow.dismiss('cancel');
        }, 3000);
    }
}
