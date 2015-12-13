import Chat from './chat.model';
import User from '../users/user.model';

export default class Message {
  constructor(parameters) {
    this.id = parameters.id;
    this.text = parameters.text;
    this.user = new User(parameters.user);
  }

  messageImage() {
    return this.user.avatarURL();
  }
}
