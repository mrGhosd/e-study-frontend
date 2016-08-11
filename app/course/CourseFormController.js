import envConfig from '../../config/env.config.js';

export default class CourseFormController {
  constructor($scope, $state, CourseFactory, course, LessonFactory, Upload, UserService) {
    this.$scope = $scope;
    this.$scope.courseDesc = course.description;
    this.course = course;
    this.$state = $state;
    this.CourseFactory = CourseFactory;
    this.$scope.lessons = course.lessons;
    this.LessonFactory = LessonFactory;
    this.beginDatePopupOpened = null;
    this.endDatePopupOpened = null;
    this.rateMax = 3;
    this.Upload = Upload;
    this.host = envConfig[process.env.NODE_ENV].host;
    this.port = envConfig[process.env.NODE_ENV].port;
    this.imageUrl = `http://${this.host}:${this.port}/api/v0/attaches`;
    this.$scope.isReadonly = false;
    this.UserService = UserService;
  }

  trixInitialize(e, editor) {
    editor.insertHTML(this.course.description);
  }

  trixInitializeForLesson(e, editor, $index) {
    let lesson = this.$scope.lessons[$index];
    editor.insertHTML(lesson.description);
  }

  changedValue(event, editor) {
    this.$scope.courseDesc = editor.getDocument().toString();
  }

  makeRequest() {
    let promise = {};
    let params = {
      title: this.course.title,
      description: this.$scope.courseDesc || this.course.description,
      short_description: this.course.short_description,
      slug: this.course.slug,
      lessons: this.$scope.lessons,
      begin_date: this.course.begin_date,
      end_date: this.course.end_date,
      difficult: this.parseDifficultValue(this.course.difficult)
    };

    if(this.course.image){
        params.image = {
            attachable_type: "Course",
            id: this.course.image.id
        };
    }

    console.log(this.course);
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
          let keys = Object.keys(error);
          keys.map((item, index) => {
            if (item !== 'lesson') {
              this.courseForm.$errors[item] = error[item];
            }
          });
          if (error.lessons.length > 0) {
            this.courseForm.$errors['lessons'] = [];
            error.lessons.forEach((item, index) => {
              if (typeof item === 'string') {
                  this.courseForm.$errors.lessons_length = item;
                  return;
              }
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

  openDatepicker(id) {
    if (id === 'begin') {
      this.beginDatePopupOpened = true;
      this.endDatePopupOpened = false;
    }
    else {
      this.beginDatePopupOpened = false;
      this.endDatePopupOpened = true;
    }

  }

  removeLessonFromList(index) {
    this.$scope.lessons.splice(index, 1);
  }

  parseDifficultValue(difficult) {
    var returnStr;

    switch (difficult) {
      case 1:
        returnStr = 'easy';
        break;
      case 2:
        returnStr = 'medium';
        break;
      case 3:
        returnStr = 'hard';
        break;
    }

    return returnStr;
  }

  upload(file){
      // this.setDefaultLoadNotifications();
      // this.usSpinnerService.spin('user-form-image');
      this.Upload.upload({
          url: this.imageUrl,
          fields: {'attachable_type': "Course", 'type': "Image"},
          file: file
      }).then( (object) => {
          this.course.image = object.data.attach;
          // this.usSpinnerService.stop('user-form-image');
          this.loadedSuccessfully = true;
          this.loadedFailure = false;
      },
      (error) => {
          // this.usSpinnerService.stop('user-form-image');
          this.loadedSuccessfully = false;
          this.loadedFailure = true;
          // this.Notification.alert('notifications.profile_update_image_failure');
      })
  }

  uploadImageForLesson(file, lesson) {
    this.Upload.upload({
        url: this.imageUrl,
        fields: {'attachable_type': "Lesson", 'type': "Image"},
        file: file
    }).then( (object) => {
        lesson.image = object.data.attach;
    },
    (error) => {
        this.loadedSuccessfully = false;
        this.loadedFailure = true;
    })
  }

  hoveringOver(value) {
    this.overStar = value;
    this.ratingTitle = this.parseDifficultValue(value);
  }

  getUsers(query) {
    return this.UserService.search(query);
  }

  selectTeacher($item, lesson) {
    lesson.teacher = $item;
    lesson.teacher_name = $item.correctNaming();
    console.log(lesson);
  }
}
