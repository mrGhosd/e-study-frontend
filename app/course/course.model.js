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
  }

  avatarURL() {
      if (this.image) {
        return this.image.url;
      }
      else {
        return '/images/empty-course.png';
      }
  }
}
