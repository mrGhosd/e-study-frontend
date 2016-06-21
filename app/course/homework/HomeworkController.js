export default class HomeworkController {
  constructor($scope, homework) {
    $scope.homework = homework;
    $scope.object = homework;
    $scope.type = 'homework';
    $scope.comments = homework.comments;
    $scope.courseId = homework.course.slug || homework.course.id;
    $scope.lessonId = homework.lesson.slug || homework.lesson.id;
  }
}
