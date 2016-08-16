import Homework from 'course/homework/homework.model.js';

export default class HomeworkFactory {
  constructor(ApiRequest, $q) {
    this.ApiRequest = ApiRequest;
    this.$q = $q;
  }

  create(courseId, lessonId, homework) {
    let def = this.$q.defer();
    console.log(courseId, lessonId);
    this.ApiRequest.post(`/courses/${courseId}/lessons/${lessonId}/homeworks`, { homework })
        .then((response) => {
            def.resolve(response.data.homework);
        })
        .catch((error) => {
          const err = error.data.errors || error;
          def.reject(err);
        });
      return def.promise;
  }

  get(courseId, lessonId, homeworkId) {
    let def = this.$q.defer();
    this.ApiRequest.get(`/courses/${courseId}/lessons/${lessonId}/homeworks/${homeworkId}`)
        .then((response) => {
          def.resolve(response.data.homework);
        })
        .catch((error) => {
          const err = error.data.errors || error;
          def.reject(err);
        });
      return def.promise;
  }

  update(courseId, lessonId, homeworkId, homework) {
    let def = this.$q.defer();
    this.ApiRequest.put(`/courses/${courseId}/lessons/${lessonId}/homeworks/${homeworkId}`, { homework })
        .then((response) => {
          def.resolve(response.data.homework);
        })
        .catch((error) => {
          const err = error.data.errors || error;
          def.reject(err);
        });
      return def.promise;
  }

  delete(courseId, lessonId, homeworkId) {
    return this.ApiRequest.destroy(`/courses/${courseId}/lessons/${lessonId}/homeworks/${homeworkId}`);
  }
}
