export default class CourseFormController {
  constructor($scope, $state, CourseFactory, course, LessonFactory) {
    this.$scope = $scope;
    this.$scope.courseDesc = course.description;
    this.course = course;
    this.$state = $state;
    this.CourseFactory = CourseFactory;
    this.$scope.lessons = course.lessons;
    this.LessonFactory = LessonFactory;
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
      description: this.$scope.courseDesc || this.course.description,
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
          this.courseForm.$errors = {};
          this.courseForm.$submitted = true;
          this.courseForm.$errors = error;
          this.courseForm.$invalid = true;
          console.log(error);
          if (error.lessons) {
            this.courseForm.$errors['lessons'] = [];
            error.lessons.map((item, index) => {
              const keys = Object.keys(item);
              const indexValue = keys.first;
              const value = item[indexValue];
              this.courseForm.$errors.lessons[keys.first] = value;
            });
          }
        });
  }

  addLesson() {
    this.$scope.lessons.push({
      title: '',
      description: ''
    });
  }

  removeLesson(index) {
    let lesson = this.$scope.lessons[index];
    if (!lesson.id) {
      this.removeLessonFromList(index);
    }
    else {
      this.LessonFactory.destroy(this.course.id, lesson.id)
      .then(() => {
        this.removeLessonFromList(index);
      });
    }
  }

  removeLessonFromList(index) {
    this.$scope.lessons.splice(index, 1);
  }
}
