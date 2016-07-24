export default class CoursesController {
  constructor($scope, courses, CourseFactory, currentUserFactory) {
    this.courses = courses;
    this.CourseFactory = CourseFactory;
    this.currentUser = currentUserFactory.getUser();
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
