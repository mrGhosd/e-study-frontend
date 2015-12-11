export default class ChatFactory {
  constructor(ApiRequest, $q) {
    this.ApiRequest = ApiRequest;
    this.$q = $q;
  }

  getAll() {
    let def = this.$q.defer();
    this.ApiRequest.get('/chats')
    .then((response) => {
      def.resolve(response.data.chats);
    });
    return def.promise;
  }

  create(params) {
    let def = this.$q.defer();
    this.ApiRequest.post('/chats', {chat: params})
    .then((response) => {
      def.resolve(response.data.chats);
    });
    return def.promise;
  }
}
