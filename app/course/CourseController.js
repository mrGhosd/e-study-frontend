export default class CourseController {
  constructor($scope, course, HomeworkFactory, currentUserFactory,
    CourseFactory, Notification, $rootScope) {
    this.$scope = $scope;
    this.course = course;
    this.$scope.course = course;
    this.$scope.comments = course.comments;
    this.HomeworkFactory = HomeworkFactory;
    this.currentUserFactory = currentUserFactory;
    this.currentUser = currentUserFactory.getUser();
    $scope.object = course;
    $scope.type = 'course';
    this.rateMax = 3;
    $scope.isReadOnly = true;
    this.CourseFactory = CourseFactory;
    this.Notification = Notification;
    this.$rootScope = $rootScope;
    this.handleCurrentUser();
  }

  currentUserInStudents() {
    let students = this.course.students;
    let result;
    if (students.length > 0) {
      const mappedStudents = students.map((item) => {
        return item.id
      });
      result = mappedStudents.includes(this.currentUser.id)
    } else {
      result = false;
    }
    return result || this.course.author.id === this.currentUser.id;
  }

  enrollCourse() {
    this.CourseFactory.enroll(this.course.id)
      .then((course) => {
        this.currentUser.studying_courses.push(course.id);
        this.currentUserFactory.setUser(this.currentUser);
        this.Notification.info('notifications.course_enrolled');
      })
      .catch(errors => {

      });
  }

  courseEnrolled() {
    return !this.currentUser.studying_courses.includes(this.course.id);
  }

  displayEnrollButton() {
    return this.courseEnrolled() && this.course.author.id !== this.currentUser.id;
  }

  handleCurrentUser() {
    this.$rootScope.$on('currentUser', (event, args) => {
      this.currentUserFactory.setUser(args.user);
      this.currentUser = this.currentUserFactory.getUser();
      console.log(this.currentUser);
    });
    this.$rootScope.$on('signedOut', (event, args) => {
        const defaultUser = {
          studying_courses: []
        };
        this.currentUserFactory.setUser(defaultUser);
        this.currentUser = this.currentUserFactory.getUser();
    });
  }
}
