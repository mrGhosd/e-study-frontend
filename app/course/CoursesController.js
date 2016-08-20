export default class CoursesController {
  constructor($scope, courses, CourseFactory, currentUserFactory, $rootScope) {
    this.courses = courses;
    this.CourseFactory = CourseFactory;
    this.currentUserFactory = currentUserFactory;
    this.currentUser = currentUserFactory.getUser();
    this.emptyInfo = this.emptyUserInfo();
    this.$rootScope = $rootScope;
    this.handleCurrentUser();
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

  emptyUserInfo() {
    const keys = Object.keys(this.currentUser);
    return keys.length === 1, keys.first === 'studying_courses';
  }

  handleCurrentUser() {
    let self = this;
    this.$rootScope.$on('currentUser', (event, args) => {
      this.currentUserFactory.setUser(args.user);
      this.currentUser = this.currentUserFactory.getUser();
      this.emptyInfo = this.emptyUserInfo();
    });
    this.$rootScope.$on('signedOut', (event, args) => {
        const defaultUser = {
          studying_courses: []
        };
        this.currentUserFactory.setUser(defaultUser);
        this.currentUser = this.currentUserFactory.getUser();
        this.emptyInfo = this.emptyUserInfo();
    });
  }
}
