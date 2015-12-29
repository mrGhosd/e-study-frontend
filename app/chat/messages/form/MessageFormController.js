import envConfig from '../../../../config/env.config.js';

export default class MessageFormController {
  constructor($scope, $rootScope, MessageFactory, Upload) {
    this.MessageFactory = MessageFactory;
    this.attaches = [];
    this.loadedAttaches = [];
    this.Upload = Upload;
    this.host = envConfig[process.env.NODE_ENV].host;
    this.port = envConfig[process.env.NODE_ENV].port;
    this.fileUrl = `http://${this.host}:${this.port}/api/v0/attaches`;
  }

  upload(files){
    if (files != null) {
      console.log(files);
      this.attaches = files;
      this.attaches.map((attach) => {
        const params = this.setAttachableParams(attach);
        this.Upload.upload(params).then( (object) => {
          this.attaches = [];
          this.loadedAttaches.push(object);
        },
        (error) => {
            this.usSpinnerService.stop('user-form-image');
            this.loadedSuccessfully = false;
            this.loadedFailure = true;
            this.Notification.alert('notifications.profile_update_image_failure');
        })
      });
    }

      // this.setDefaultLoadNotifications();
      // this.usSpinnerService.spin('user-form-image');
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
      this.attaches = [];
      this.chat.messages.push(message);
    })
    .catch((errors) => {
      console.log(errors);
    });

  }
}
