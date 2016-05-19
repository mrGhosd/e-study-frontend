import envConfig from '../../config/env.config.js';

export default class User{
    constructor(attributes){
        this.setAttributes(attributes);
    }

    setAttributes(attributes){
        for(let attr in attributes){
            this[attr] = attributes[attr];
        }
    }

    correctNaming(){
        if(this.last_name && this.first_name){
            return this.last_name + " " + this.first_name;
        } else {
            return this.email;
        }
    };

    humanizedDate(date){
        let newDate = new Date(date);
        let timeSeparated = [newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()];
        let dateSeparated = [newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear()];
        return timeSeparated.join(":") + " " + dateSeparated.join(".");
    }

    humanizedOnlyDate(date){
        let newDate = new Date(date);
        let dateSeparated = [newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear()];
        return dateSeparated.join(".");
    }

    isOnline() {
      let status = '';
      let diffSeconds = this.getDateDiffInSeconds();
      return diffSeconds < 60;
    }

    getDateDiffInSeconds() {
      let date = new Date(this.last_sign_in_at);
      let currentDate = new Date();
      let timeDiff = Math.abs(date.getTime() - currentDate.getTime());
      let diffSeconds = Math.ceil(timeDiff / (1000 * 60));
      return diffSeconds;
    }

    avatarURL() {
        const hostName = envConfig[process.env.NODE_ENV].host;
        const portName = envConfig[process.env.NODE_ENV].port;
        const imageKeys = this.image && Object.keys(this.image).length > 0;
        const imageDataKeys = this.imageData && Object.keys(this.imageData).length > 0;

        if (imageDataKeys) {
          return `http://${hostName}:${portName}${this.imageData.image.url}`;
        }
        else {
          return imageKeys ? this.image.url : '/images/empty-user.png';
        }
    }
}
