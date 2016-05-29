export default class CourseController {
  constructor($scope, course, HomeworkFactory) {
    this.$scope = $scope;
    this.course = course;
    this.HomeworkFactory = HomeworkFactory;
  }

  deleteHomework(homework) {
    this.HomeworkFactory.delete(this.course.id, homework.id).then((response) => {
      this.removeFromList(homework);
    });
  }

  removeFromList(homework) {
    if (this.course.homeworks.includes(homework)) {
      let index = this.course.homeworks.indexOf(homework);
      this.course.homeworks.splice(index, 1);
    }
  }
}
