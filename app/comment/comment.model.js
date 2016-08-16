import User from 'users/user.model';

export default class CommentModel {
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
