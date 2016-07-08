export default class Course {
  constructor(attributes){
      this.setAttributes(attributes);
  }

  setAttributes(attributes){
      for(let attr in attributes){
          this[attr] = attributes[attr];
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
