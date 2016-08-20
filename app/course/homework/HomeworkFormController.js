export default class HomeworkFormController {
  constructor($scope, homework, $stateParams, $state, HomeworkFactory,
              $rootScope, currentUserFactory) {
    this.$scope = $scope;
    this.homework = homework;
    this.homeworkForm = {};
    $scope.homeworkText = homework.text;
    this.$stateParams = $stateParams;
    this.courseId = $stateParams.course_id;
    this.lessonId = $stateParams.lesson_id;
    this.homeworkId = $stateParams.id;
    this.$state = $state;
    this.HomeworkFactory = HomeworkFactory;
    this.$rootScope = $rootScope;
    this.currentUserFactory = currentUserFactory;
    this.handleCurrentUser();
  }

  trixInitialize(e, editor) {
    if (this.homework.text) {
      editor.insertHTML(this.homework.text);
    }
  }

  makeRequest() {
    let promise = {};
    const params = {
      text: this.$scope.homeworkText
    };

    if (this.homework.id) {
      promise = this.HomeworkFactory.update(this.courseId, this.lessonId, this.homework.id, params);
    }
    else {
      promise = this.HomeworkFactory.create(this.courseId, this.lessonId, params);
    }

    promise
      .then((response) => {
        this.$state.go('lesson', { course_id: this.courseId,
                                     id: this.lessonId});
      })
      .catch((error) => {
        this.homeworkForm.$submitted = true;
        this.homeworkForm.$errors = error;
        this.homeworkForm.$invalid = true;
      });
  }

  handleCurrentUser() {
    let self = this;
    this.$rootScope.$on('currentUser', (event, args) => {
      this.currentUserFactory.setUser(args.user);
    });
    this.$rootScope.$on('signedOut', (event, args) => {
        const defaultUser = {
          studying_courses: []
        };
        this.currentUserFactory.setUser(defaultUser);
        this.$state.go('course', { id: this.$stateParams.course_id });
    });
  }
}
