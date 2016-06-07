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

  update(id, comment) {
    let def = this.$q.defer();
    this.ApiRequest.put(`/comments/${id}`, { comment })
        .then((response) => {
          def.resolve(response.data.comment);
        })
        .catch((response) => {
          def.reject(response.data.errors);
        });
    return def.promise;
  }

  destroy(commentId) {
    let def = this.$q.defer();
    this.ApiRequest.destroy(`/comments/${commentId}`)
        .then((response) => {
          console.log(response);
          def.resolve(response.data.deleted);
        })
        .catch((response) => {
          def.reject(response.data.errors);
        });
    return def.promise;
  }
}
