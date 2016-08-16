import User from 'users/user.model.js';
import Lesson from 'course/lesson/lesson.model.js';
import Comment from 'comment/comment.model';

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
      if (attributes.lessons) {
        this.lessons = attributes.lessons.map((item) => {
          return new Lesson(item);
        });
      }
      if (attributes.comments) {
        this.comments = attributes.comments.map((item) => {
          return new Comment(item);
        });
      }
      if (attributes.students) {
        this.students = attributes.students.map(item => {
          return new User(item);
        });
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

  getDifficultName() {
    var returnStr;

    switch (this.difficult) {
      case 1:
        returnStr = 'course.difficult_value.easy';
        break;
      case 2:
        returnStr = 'course.difficult_value.medium';
        break;
      case 3:
        returnStr = 'course.difficult_value.hard';
        break;
    }

    return returnStr;
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
