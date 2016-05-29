export default class CourseController {
  constructor($scope, course) {
    console.log(course);
    this.$scope = $scope;
    this.course = course;
  }
}
