export default class HomeworkController {
  constructor($scope, homework) {
    $scope.homework = homework;
    $scope.object = homework;
    $scope.type = 'homework';
    $scope.comments = homework.comments;
  }
}
