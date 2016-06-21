export default class HomeworkFormController {
  constructor($scope, homework, $stateParams, $state, HomeworkFactory) {
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
        this.$state.go('homework', { course_id: this.courseId,
                                     lesson_id: this.lessonId,
                                     id: this.homeworkId });
      })
      .catch((error) => {
        this.homeworkForm.$submitted = true;
        this.homeworkForm.$errors = error;
        this.homeworkForm.$invalid = true;
      });
  }
}
