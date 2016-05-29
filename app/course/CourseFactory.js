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
          def.resolve(response.data.course);
        })
        .catch((errors) => {
          def.reject(errors.data.errors);
        });
    return def.promise;
  }

  get(id) {
    let def = this.$q.defer();
    this.ApiRequest.get(`/courses/${id}`)
        .then((response) => {
          console.log(response);
          def.resolve(response.data.course);
        });
    return def.promise;
  }

  update(id, course) {
    let def = this.$q.defer();
    this.ApiRequest.put(`/courses/${id}`, { course })
        .then((response) => {
          def.resolve(response.data.course);
        })
        .catch((errors) => {
          def.reject(errors.data.errors);
        });
    return def.promise;
  }

  destroy(id) {
    let def = this.$q.defer();
    this.ApiRequest.destroy(`/courses/${id}`)
        .then((response) => {
          def.resolve(response.data.deleted);
        })
        .catch((errors) => {
          def.reject(errors.data.errors);
        });
    return def.promise;
  }
}
