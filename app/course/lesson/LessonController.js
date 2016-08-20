export default class LessonController {
  constructor($scope, lesson, HomeworkFactory, AuthService, currentUserFactory,
              $state, $rootScope) {
    this.lesson = lesson;
    this.$scope = $scope;
    $scope.lesson = lesson;
    $scope.comments = lesson.comments;
    $scope.object = lesson;
    $scope.type = 'lesson';
    $scope.courseId = lesson.course.slug || lesson.course.id;
    this.HomeworkFactory = HomeworkFactory;
    this.currentUserFactory = currentUserFactory;
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.$scope.currentUser = currentUserFactory.getUser();
    this.emptyInfo = this.emptyUserInfo();
    this.handleCurrentUser();
  }

  deleteHomework(homework) {
    this.HomeworkFactory.delete(this.lesson.course.id, this.lesson.id, homework.id).then((response) => {
      this.removeFromList(homework);
    });
  }

  removeFromList(homework) {
    if (this.lesson.homeworks.includes(homework)) {
      let index = this.lesson.homeworks.indexOf(homework);
      this.lesson.homeworks.splice(index, 1);
    }
  }

  emptyUserInfo() {
    const keys = Object.keys(this.$scope.currentUser);
    return keys.length === 1, keys.first === 'studying_courses';
  }

  handleCurrentUser() {
    let self = this;
    this.$rootScope.$on('currentUser', (event, args) => {
      self.currentUserFactory.setUser(args.user);
      this.$scope.currentUser= self.currentUserFactory.getUser();
      this.emptyInfo = this.emptyUserInfo();
      this.$state.go('lesson', { course_id: this.lesson.course.slug || this.lesson.course.id,
                                 id: this.lesson.slug || this.lesson.id });
    });
    this.$rootScope.$on('signedOut', (event, args) => {
        const defaultUser = {
          studying_courses: []
        };
        this.currentUserFactory.setUser(defaultUser);
        this.emptyInfo = this.emptyUserInfo();
        this.$state.go('course', { id: this.lesson.course.slug || this.lesson.course.id });
    });
  }
}
