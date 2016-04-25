import envConfig from '../../../../config/env.config.js';

export default class MessageFormController {
  constructor($scope, $rootScope, MessageFactory, Upload,
      WebSockets, DialogFactory) {
    this.MessageFactory = MessageFactory;
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.attaches = [];
    this.loadedAttaches = [];
    this.Upload = Upload;
    this.DialogFactory = DialogFactory;
    this.WebSockets = WebSockets;
    this.host = envConfig[process.env.NODE_ENV].host;
    this.port = envConfig[process.env.NODE_ENV].port;
    this.fileUrl = `http://${this.host}:${this.port}/api/v0/attaches`;
    this.typingTimer = {};
    this.doneTypingInterval = 500;
  }

  upload(files){
    if (files != null) {
      this.attaches = files;
      this.attaches.map((attach) => {
        const params = this.setAttachableParams(attach);
        this.Upload.upload(params).then( (object) => {
          this.loadedAttaches.push(object.data.attach);
        },
        (error) => {
            this.usSpinnerService.stop('user-form-image');
            this.loadedSuccessfully = false;
            this.loadedFailure = true;
            this.Notification.alert('notifications.profile_update_image_failure');
        })
      });
    }
  }

  beginTyping() {
    let notificationsIds = this.currentUser.notifications.map(item => item.notificationable_id);
    if (notificationsIds.includes(this.chat.id)) {
      const notifications = [];
      this.currentUser.notifications.forEach(item => {
        if (item.notificationable_id === this.chat.id) {
          notifications.push(item.id);
        }
      });
      const params = { notifications };

      this.DialogFactory.destroyNotification(params)
      .then(notifications => {
        this.$rootScope.$broadcast('currentUserDeleteNotifications', { chat_id: this.chat.id });
      });
    }
    this.WebSockets.emit('userbegintyping', { chat: this.chat, user: this.currentUser });
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(this.doneTyping.bind(this), this.doneTypingInterval);
  }

  endTyping() {
    clearTimeout(this.typingTimer);
  }

  doneTyping() {
    this.WebSockets.emit('userendtyping', { chat: this.chat, user: this.currentUser });
  }

  setAttachableParams(attach) {
    const type = this.setAttachType(attach);
    return {
      url: this.fileUrl,
      fields: { 'attachable_type': 'Message', 'type': type },
      file: attach
    }
  }

  setAttachType(attach){
    let type = "";

    if (attach.type.match(/image/)) {
      type = "Image";
    }
    else if(attach.type.match(/pdf/)) {
      type = "Pdf";
    }
    else if(attach.type.match(/msword/)
    || attach.type.match(/opendocument.text/)) {
      type = "Doc";
    }
    else if(attach.type.match(/ms-excel/)
    || attach.type.match(/opendocument.spreadsheet/)) {
      type = "Table";
    }
    else if(attach.type.match(/zip/)) {
      type = "Zip";
    }
    else if(attach.type.match(/ms-powerpoint/)) {
      type = "Presentation";
    }
    else {
      type = "Attach";
    }
    return type;
  }

  createMessage() {
    this.WebSockets.emit('userendtyping', { chat: this.chat, user: this.currentUser });
    const message = {
      message: {
        user_id: this.currentUser.id,
        chat_id: this.chat.id,
        text: this.message,
        attaches: this.loadedAttaches
      }
    };
    this.MessageFactory.create(message)
    .then((message) => {
      this.message = '';
      this.loadedAttaches = [];
      this.chat.messages.push(message);
    })
    .catch((errors) => {
      this.errors = errors.data.errors;
      console.log(this.errors);
    });
  }
}
