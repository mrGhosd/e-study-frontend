export default class HomeworkFactory {
  constructor(ApiRequest, $q) {
    this.ApiRequest = ApiRequest;
    this.$q = $q;
  }

  create(courseId, homework) {
    let def = this.$q.defer();
    this.ApiRequest.post(`/courses/${courseId}/homeworks`, { homework })
        .then((response) => {
            def.resolve(response.data.homework);
        })
        .catch((error) => {
          def.reject(error.data.errors);
        });
      return def.promise;
  }

  get(courseId, homeworkId) {
    let def = this.$q.defer();
    this.ApiRequest.get(`/courses/${courseId}/homeworks/${homeworkId}`)
        .then((response) => {
          def.resolve(response.data.homework);
        })
        .catch((error) => {
          def.reject(error.data.errors);
        });
      return def.promise;
  }

  update(courseId, homeworkId, homework) {
    let def = this.$q.defer();
    this.ApiRequest.put(`/courses/${courseId}/homeworks/${homeworkId}`, { homework })
        .then((response) => {
          def.resolve(response.data.homework);
        })
        .catch((error) => {
          def.reject(error.data.errors);
        });
      return def.promise;
  }

  delete(courseId, homeworkId) {
    return this.ApiRequest.destroy(`/courses/${courseId}/homeworks/${homeworkId}`);
  }
}
