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
}
