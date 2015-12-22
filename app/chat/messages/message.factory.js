import Message from './message.model';

export default class MessageFactory {
  constructor(ApiRequest, $q) {
    this.ApiRequest = ApiRequest;
    this.$q = $q;
  }

  create(params) {
    let def = this.$q.defer();
    this.ApiRequest.post('/messages', params)
    .then((response) => {
      def.resolve(new Message(response.data.message));
    });
    return def.promise;
  }
}
