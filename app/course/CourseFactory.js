export default class CourseFactory {
  constructor(ApiRequest, $q) {
    this.ApiRequest = ApiRequest;
    this.$q = $q;
  }

  getList() {
    return this.ApiRequest.get('/courses');
  }
}
