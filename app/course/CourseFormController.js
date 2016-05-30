export default class CourseFormController {
  constructor($scope, $state, CourseFactory, course) {
    this.$scope = $scope;
    this.$scope.courseDesc = course.description;
    this.course = course;
    this.$state = $state;
    this.CourseFactory = CourseFactory;
    this.$scope.lessons = course.lessons;
  }

  trixInitialize(e, editor) {
    editor.insertHTML(this.course.description);
  }

  trixInitializeForLesson(e, editor, $index) {
    let lesson = this.$scope.lessons[$index];
    editor.insertHTML(lesson.description);
  }

  makeRequest() {
    let promise = {};
    const params = {
      title: this.course.title,
      description: this.$scope.courseDesc,
      lessons: this.$scope.lessons
    };

    if (this.course.id) {
      promise = this.CourseFactory.update(this.course.id, params);
    }
    else {
      promise = this.CourseFactory.create(params);
    }

    promise
        .then((response) => {
          this.$state.go('courses');
        })
        .catch((error) => {
          this.courseForm.$submitted = true;
          this.courseForm.$errors = error;
          this.courseForm.$invalid = true;
          console.log(this);
        });
  }

  addLesson() {
    this.$scope.lessons.push({
      title: '',
      description: ''
    });
    console.log(this.$scope.lessons);
  }

  removeLesson(index) {
    let lesson = this.$scope.lessons[index];
    if (!lesson.id) {
      this.$scope.lessons.splice(index, 1);
    }
  }
}
