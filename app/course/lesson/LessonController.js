export default class LessonController {
  constructor($scope, lesson, HomeworkFactory, AuthService, currentUserFactory) {
    this.lesson = lesson;
    this.$scope = $scope;
    $scope.lesson = lesson;
    $scope.comments = lesson.comments;
    $scope.object = lesson;
    $scope.type = 'lesson';
    $scope.courseId = lesson.course.slug || lesson.course.id;
    this.HomeworkFactory = HomeworkFactory;
    $scope.currentUser = currentUserFactory.getUser();
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
}
