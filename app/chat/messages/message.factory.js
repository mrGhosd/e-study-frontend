import Message from './message.model';
import envConfig from '../../../config/env.config.js';

export default class MessageFactory {
  constructor(ApiRequest, $q) {
    this.ApiRequest = ApiRequest;
    this.$q = $q;
    this.hostName = envConfig[process.env.NODE_ENV].chat_host;
    this.portName = envConfig[process.env.NODE_ENV].chat_port;
    this.fullUrl = `http://${this.hostName}:${this.portName}`;
  }

  create(params) {
    let def = this.$q.defer();
    let url = `${this.fullUrl}/messages`;
    this.ApiRequest.plainRequest(url, 'POST', params)
    .then((response) => {
      console.log(response);
      def.resolve(new Message(response.data.message));
    })
    .catch((errors) => {
      def.reject(errors);
    });
    return def.promise;
  }
}
