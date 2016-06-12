export default class CourseController {
  constructor($scope, course, HomeworkFactory) {
    this.$scope = $scope;
    this.course = course;
    this.$scope.course = course;
    this.$scope.comments = course.comments;
    this.HomeworkFactory = HomeworkFactory;
    $scope.object = course;
    $scope.type = 'course';
  }
}
