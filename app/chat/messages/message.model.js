import Chat from '../dialogs/dialog.model';
import User from '../../users/user.model';

export default class Message {
  constructor(parameters) {
    this.id = parameters.id;
    this.userId = parameters.user.id;
    this.text = parameters.text;
    this.createdAt = this.humanizedDate(parameters.created_at);
    this.user = new User(parameters.user);
    this.attaches = parameters.attaches;
  }

  messageImage() {
    return this.user.avatarURL();
  }

  humanizedDate(date){
      let newDate = new Date(date);
      let timeSeparated = [newDate.getHours(), newDate.getMinutes(), newDate.getSeconds()];
      let dateSeparated = [newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear()];
      return timeSeparated.join(":") + " " + dateSeparated.join(".");
  }
}
