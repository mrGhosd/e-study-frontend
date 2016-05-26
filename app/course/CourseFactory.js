export default class CourseFactory {
  constructor(ApiRequest, $q) {
    this.ApiRequest = ApiRequest;
    this.$q = $q;
  }

  getList() {
    let def = this.$q.defer();
    this.ApiRequest.get('/courses')
        .then((response) => {
          def.resolve(response.data.courses);
        });
    return def.promise;
  }

  create(course) {
    let def = this.$q.defer();
    this.ApiRequest.post('/courses', { course })
        .then((response) => {
          def.resolve(response.data.courses);
        })
        .catch((errors) => {
          console.log(errors);
          def.reject(errors.data.errors);
        });
    return def.promise;
  }
}
