export default class HomeworkController {
  constructor($scope, homework, $rootScope, currentUserFactory) {
    $scope.homework = homework;
    $scope.object = homework;
    $scope.type = 'homework';
    $scope.comments = homework.comments;
    $scope.courseId = homework.course.slug || homework.course.id;
    $scope.lessonId = homework.lesson.slug || homework.lesson.id;
    this.$rootScope = $rootScope;
    this.currentUserFactory = currentUserFactory;
  }

  handleCurrentUser() {
    let self = this;
    this.$rootScope.$on('currentUser', (event, args) => {
      this.currentUserFactory.setUser(args.user);
      this.$scope.currentUser= this.currentUserFactory.getUser();
      this.emptyInfo = this.emptyUserInfo();
    });
    this.$rootScope.$on('signedOut', (event, args) => {
        const defaultUser = {
          studying_courses: []
        };
        this.currentUserFactory.setUser(defaultUser);
        this.emptyInfo = this.emptyUserInfo();
        this.$state.go('course', { id: this.homework.course.slug || this.homework.course.id });
    });
  }
}
