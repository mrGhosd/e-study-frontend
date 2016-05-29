export default class HomeworkFormController {
  constructor($scope, homework, $stateParams, $state, HomeworkFactory) {
    this.$scope = $scope;
    this.homework = homework;
    this.homeworkForm = {};
    $scope.homeworkText = homework.text;
    this.$stateParams = $stateParams;
    this.courseId = $stateParams.course_id;
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

    }
    else {
      promise = this.HomeworkFactory.create(this.courseId, params);
    }

    promise
      .then((response) => {
        this.$state.go('course', { id: this.courseId });
      })
      .catch((error) => {
        console.log(this);
        this.homeworkForm.$submitted = true;
        this.homeworkForm.$errors = error;
        this.homeworkForm.$invalid = true;
      });
  }
}
