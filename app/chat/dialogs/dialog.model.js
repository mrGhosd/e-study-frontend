import User from '../../users/user.model';
import Message from '../messages/message.model';
import { humanizedDateTime } from 'util/DateTimeHumanize';

export default class Dialog {
  constructor(params){
    this.id = params.id;
    this.users = params.users;
    this.updatedAt = params.updated_at;
    this.messages = params.messages;
    if (this.messages) {
      this.parseChatMessags();
    }
  }

  parseChatUsers() {
    
  }

  parseChatMessags() {
    let messages = [];
    this.messages.forEach((item) => {
      const msg = new Message(item);
      messages.push(msg);
    });
    this.messages = messages;
  }

  getName() {
    return this.users.map((user) => user.correctNaming() ).join(", ");
  }

  getImageURL() {
    return this.users.first.avatarURL();
  }

  setUsersArrayForUser(user) {
    if (this.users.map((user) => user.id).includes(user.id)) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i]['id'] === user.id) {
          this.users.splice(i, 1);
        }
        this.users[i] = new User(this.users[i]);
      }
    }
    return this;
  }

  lastMessageText() {
    return this.messages.last.text.substr(0, 25) + "...";
  }

  humanizedUpdatedAt() {
    return humanizedDateTime(this.updatedAt);
  }
}
