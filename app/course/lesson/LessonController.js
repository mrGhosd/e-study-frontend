export default class LessonController {
  constructor($scope, lesson) {
    this.lesson = lesson;
    this.$scope = $scope;
    $scope.lesson = lesson;
    $scope.comments = lesson.comments;
    $scope.object = lesson;
    $scope.type = 'lesson';
  }
}
