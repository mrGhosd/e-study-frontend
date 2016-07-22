import User from 'users/user.model.js';

export default class Course {
  constructor(attributes){
      this.setAttributes(attributes);
  }

  setAttributes(attributes){
      for(let attr in attributes){
          this[attr] = attributes[attr];
      }
      if (attributes.author) {
        this.author = new User(attributes.author);
      }
      if (attributes.difficult) {
        this.difficult = this.getDifficultNumber();
      }
  }

  avatarURL() {
      if (this.image) {
        return this.image.url;
      }
      else {
        return '/images/empty-course.png';
      }
  }

  getDifficultNumber() {
    let value;
    switch (this.difficult) {
      case 'easy':
        value = 1;
        break;
      case 'medium':
        value = 2;
        break;
      case 'hard':
        value = 3;
        break
      default:
        value = 1;
        break;
    }

    return value;
  }
}
