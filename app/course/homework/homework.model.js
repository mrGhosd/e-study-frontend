import User from 'users/user.model.js';
import Lesson from 'course/lesson/lesson.model.js';
import Course from 'course/course.model.js';

export default class Homework {
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
      if (attributes.lesson) {
        this.lesson = new Lesson(attributes.lesson);
      }
  }
}
