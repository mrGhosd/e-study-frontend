export default class CourseFormController {
  constructor($scope, $state, CourseFactory, course) {
    this.course = course;
    this.$state = $state;
    this.CourseFactory = CourseFactory;
  }

  makeRequest() {
    const params = {
      title: this.course.title,
      description: this.course.description
    };

    this.CourseFactory.create(params)
        .then((response) => {
          this.$state.go('courses');
        });
  }
}
