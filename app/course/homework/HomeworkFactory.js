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
}
