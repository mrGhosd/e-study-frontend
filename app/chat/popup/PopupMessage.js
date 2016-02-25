import Message from 'chat/messages/message.model';
import newMessageSound from 'sounds/new_message.mp3';

export default class PopupMessage {
    constructor($modal, $compile, $rootScope, ApiRequest) {
        this.$modal = $modal;
        this.$compile = $compile;
        this.$rootScope = $rootScope;
        this.domElement = null;
        this.ApiRequest = ApiRequest;
    }

    postMessage(message) {
      let template = require('./popup_message.html');
      let newScope = this.$rootScope.$new();
      const classMessage = new Message(message);
      newScope.text = message.text;
      newScope.avatarUrl = classMessage.messageImage();
      newScope.time = 1500;
      let audio = new Audio(newMessageSound);
      audio.play();
      console.log(audio);
      this.domElement.append(this.$compile(template)(newScope));
    }

    registerDOM(element) {
      this.domElement = element;
    }
}
