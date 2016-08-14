export default class CourseController {
  constructor($scope, course, HomeworkFactory, currentUserFactory,
    CourseFactory, Notification) {
    this.$scope = $scope;
    this.course = course;
    this.$scope.course = course;
    this.$scope.comments = course.comments;
    this.HomeworkFactory = HomeworkFactory;
    this.currentUser = currentUserFactory.getUser();
    $scope.object = course;
    $scope.type = 'course';
    this.rateMax = 3;
    $scope.isReadOnly = true;
    this.CourseFactory = CourseFactory;
    this.Notification = Notification;
  }

  enrollCourse() {
    this.CourseFactory.enroll(this.course.id)
      .then((course) => {
        this.Notification.info('notifications.course_enrolled');
      })
      .catch(errors => {
        
      });
  }
}
