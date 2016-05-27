export default class CourseFormController {
  constructor($scope, $state, CourseFactory, course) {
    this.course = course;
    this.$state = $state;
    this.CourseFactory = CourseFactory;
  }

  makeRequest() {
    let promise = {};
    const params = {
      title: this.course.title,
      description: this.course.description
    };

    if (this.course.id) {
      promise = this.CourseFactory.update(this.course.id, params);
    }
    else {
      promise = this.CourseFactory.create(params);
    }

    promise
        .then((response) => {
          this.$state.go('courses');
        })
        .catch((error) => {
          this.courseForm.$submitted = true;
          this.courseForm.$errors = error;
          this.courseForm.$invalid = true;
          console.log(this);
        });
  }
}
