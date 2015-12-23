import Chat from './dialog.model.js';

export default class DialogFactory {
  constructor(ApiRequest, $q) {
    this.ApiRequest = ApiRequest;
    this.$q = $q;
  }

  getAll() {
    let def = this.$q.defer();
    this.ApiRequest.get('/chats')
    .then((response) => {
      let newChats = [];
      for (const obj of response.data.chats) {
        const chat = new Chat(obj);
        newChats.push(chat);
      }
      def.resolve(newChats);
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

  get(id) {
    let def = this.$q.defer();
    this.ApiRequest.get(`/chats/${id}`)
    .then((response) => {
      def.resolve(new Chat(response.data.chats));
    });
    return def.promise;
  }
}
