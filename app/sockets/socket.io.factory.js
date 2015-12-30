import io from 'socket.io-client';
import envConfig from '../../config/env.config.js';

export default class WebSockets {
  constructor($rootScope) {
    const hostName = envConfig[process.env.NODE_ENV].host;
    this.socket = io.connect(`http://${hostName}:5001`);
    this.rootScope = $rootScope;
  }

  on(eventName, callback) {
    this.socket.on(eventName, (data) => {
      for (const k in data) {
        data[k] = angular.fromJson(data[k])
      }
      this.rootScope.$apply(() => {
        callback.call(this, this.socket, angular.fromJson(data));
      });
    });
  }

  emit(eventName, data, callback) {
    this.socket.emit(eventName, data, () => {
      let args = arguments;
      this.rootScope.$apply(() => {
        if (callback) {
          callback.apply(this.socket, args);
        }
      });
    });
  }
}
