export default class CoursesController {
  constructor($scope, courses, CourseFactory) {
    this.courses = courses;
    this.CourseFactory = CourseFactory;
  }

  destroy(course) {
    this.CourseFactory.destroy(course.id)
        .then((response) => {
          this.removeFromList(course);
        });
  }

  removeFromList(course) {
    if (this.courses.includes(course)) {
      let index = this.courses.indexOf(course);
      this.courses.splice(index, 1);
    }
  }
}
