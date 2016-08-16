import Comment from './comment.model';

export default class CommentFactory {
  constructor(ApiRequest, $q) {
    this.ApiRequest = ApiRequest;
    this.$q = $q;
  }

  getList(type, id, page) {
    let def = this.$q.defer();
    if (!page) {
      page = 1;
    }
    this.ApiRequest.get('/comments', { type, id, page })
        .then((response) => {
            let newComments = [];
            for (let i = 0; i < response.data.comments.length; i++) {
                // let user = new User(response.data.users[i]);
                let comment = new Comment(response.data.comments[i]);
                newComments.push(comment);
            }
            def.resolve(newComments);
        });
    return def.promise;
  }

  create(comment) {
    let def = this.$q.defer();
    this.ApiRequest.post(`/comments`, { comment })
        .then((response) => {
          def.resolve(new Comment(response.data.comment));
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
          def.resolve(new Comment(response.data.comment));
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
          def.resolve(new Comment(response.data.deleted));
        })
        .catch((response) => {
          def.reject(response.data.errors);
        });
    return def.promise;
  }
}
