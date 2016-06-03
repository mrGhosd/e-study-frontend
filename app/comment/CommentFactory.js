export default class CommentFactory {
  constructor(ApiRequest, $q) {
    this.ApiRequest = ApiRequest;
    this.$q = $q;
  }

  create(comment) {
    let def = this.$q.defer();
    this.ApiRequest.post(`/comments`, { comment })
        .then((response) => {
          def.resolve(response.data.comment);
        })
        .catch((response) => {
          def.reject(response.data.errors);
        });
    return def.promise;
  }
}
