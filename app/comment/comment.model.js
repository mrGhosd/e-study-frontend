import User from 'users/user.model';

export default class Comment {
  constructor(attributes) {
      this.setAttributes(attributes);
  }

  setAttributes(attributes){
      for(let attr in attributes){
          this[attr] = attributes[attr];
      }
      if (attributes.user) {
        this.user = new User(attributes.user);
      }
  }
}
