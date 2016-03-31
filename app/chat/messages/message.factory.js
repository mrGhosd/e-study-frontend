import Message from './message.model';
import envConfig from '../../../config/env.config.js';

export default class MessageFactory {
  constructor(ApiRequest, $q, WebSockets) {
    this.ApiRequest = ApiRequest;
    this.$q = $q;
    const chatURL = envConfig[process.env.NODE_ENV].chat_url;
    this.fullUrl = `http://${chatURL}`;
    this.WebSockets = WebSockets;
  }

  getList(params) {
    let def = this.$q.defer();
    let url = `${this.fullUrl}/messages`;
    this.ApiRequest.plainRequest(url, 'GET', params)
    .then((response) => {
      let plainMessages = response.data.messages.resources;
      let messages = plainMessages.map((message) => {
        return new Message(message);
      });
      def.resolve(messages);
    })
    .catch((errors) => {
      def.reject(errors);
    });
    return def.promise;
  }

  create(params) {
    let def = this.$q.defer();
    let url = `${this.fullUrl}/messages`;
    this.ApiRequest.plainRequest(url, 'POST', params)
    .then((response) => {
      def.resolve(new Message(response.data.message));
    })
    .catch((errors) => {
      def.reject(errors);
    });
    return def.promise;
  }
}
