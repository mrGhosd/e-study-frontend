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
            if(this.middle_name){
                return this.last_name + " " + this.first_name + " " + this.middle_name;
            }
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

      if (diffSeconds > 60) {
        status = 'Offline';
      }
      else {
        status = 'Online';
      }
      return status;
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
        return this.image ? `http://${hostName}:${portName}${this.image.url}` : '/images/empty-user.png';
    }
}
