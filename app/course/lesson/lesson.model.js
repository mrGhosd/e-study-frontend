import User from 'users/user.model.js';
import Course from 'course/course.model.js';

export default class Lesson {
  constructor(attributes){
      this.setAttributes(attributes);
  }

  setAttributes(attributes){
      for(let attr in attributes){
          this[attr] = attributes[attr];
      }
      if (attributes.user) {
        this.user = new User(attributes.user);
      }
      if (attributes.course) {
        this.course = new Course(attributes.course);
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
