import Chat from './dialog.model.js';
import envConfig from '../../../config/env.config.js';

export default class DialogFactory {
  constructor(ApiRequest, $q) {
    this.ApiRequest = ApiRequest;
    this.$q = $q;
    const chatURL = envConfig[process.env.NODE_ENV].chat_url;
    this.fullUrl = `http://${chatURL}`;
  }

  search(params) {
    let def = this.$q.defer();
    this.ApiRequest.get('/search/chats', params)
    .then((response) => {
      let newChats = [];
      for (const obj of response.data.search) {
        const chat = new Chat(obj);
        newChats.push(chat);
      }
      def.resolve(newChats);
    });
    return def.promise;
  }

  getAll() {
    let url = `${this.fullUrl}/chats`;
    let def = this.$q.defer();
    this.ApiRequest.plainRequest(url, "GET")
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
    let url = `${this.fullUrl}/chats`;
    let def = this.$q.defer();
    this.ApiRequest.plainRequest(url, 'POST', {chat: params})
    .then((response) => {
      def.resolve(new Chat(response.data.chat));
    })
    .catch(response => {
      def.reject(response.data);
    });
    return def.promise;
  }

  get(id) {
    let url = `${this.fullUrl}/chats/${id}`;
    let def = this.$q.defer();
    this.ApiRequest.plainRequest(url, "GET")
    .then((response) => {
      def.resolve(new Chat(response.data.chat));
    });
    return def.promise;
  }

  destroy(id) {
    let url = `${this.fullUrl}/chats/${id}`;
    let def = this.$q.defer();
    this.ApiRequest.plainRequest(url, "DELETE")
    .then((response) => {
      def.resolve(response);
    })
    .catch(error => {
      def.reject(error);
    });
    return def.promise;
  }
}
