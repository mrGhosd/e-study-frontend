export default class LessonFactory {
  constructor(ApiRequest, $q) {
    this.ApiRequest = ApiRequest;
    this.$q = $q;
  }

  destroy(courseId, lessonId) {
    let def = this.$q.defer();
    this.ApiRequest.destroy(`/courses/${courseId}/lessons/${lessonId}`)
        .then((response) => {
          def.resolve(response.data.deleted);
        })
        .catch((errors) => {
          def.reject(errors.data.errors);
        });
    return def.promise;
  }
}
