import envConfig from '../../config/env.config.js';

export default class ApiRequest{
    constructor($http, $q, $window, $cookies, $localStorage, $sessionStorage) {
      this.$http = $http;
      this.$q = $q;
      this.hostName = envConfig[process.env.NODE_ENV].host;
      this.portName = envConfig[process.env.NODE_ENV].port;
      this.version = "v0";
      this.$window = $window;
      this.$cookies = $cookies;
      this.$localStorage = $localStorage;
      this.$sessionStorage = $sessionStorage;
    }

    get(url, parameters){
        return this.request(url, "GET", parameters);
    }

    post(url, parameters){
        return this.request(url, "POST", parameters);
    }

    put(url, parameters){
        return this.request(url, "PUT", parameters);
    }

    destroy(url, parameters) {
        return this.request(url, "DELETE", parameters);
    }

    correctUrl(url){
        return `http://${this.hostName}:${this.portName}/api/${this.version}${url}`;
    }

    request(url, method, parameters) {
      const token = this.$sessionStorage.remember_token || this.$localStorage.remember_token;
      let userLocale = this.getCorrectLocaleValue();

      let request = {
        method: method,
        url: this.correctUrl(url)
      };
      if (method === "GET") {
        request.params = parameters
      }
      else {
        request.data = parameters
      }

      this.$http.defaults.headers.common = {
          estudyauthtoken: token,
          locale: userLocale,
          'Content-Type': 'application/json'
      }
      return this.$http(request);
    }

    urlForAttach(url) {
      return `http://${this.hostName}:${this.portName}${url}`;
    }

    getCorrectLocaleValue() {
      let locale = navigator.language || navigator.userLanguage;
      if (locale.length > 2) {
        return locale.substring(0,2);
      }
      return locale;
    }
}

export default angular.module('estudy.api', []).service('ApiRequest', ApiRequest).name;
