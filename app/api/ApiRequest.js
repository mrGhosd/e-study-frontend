import envConfig from '../../config/env.config.js';

export default class ApiRequest{
    constructor($http, $q, $window, $cookies, $localStorage, $sessionStorage){
      this.$http = $http;
      this.$q = $q;
      this.hostName = envConfig[process.env.NODE_ENV].host;
      this.portName = envConfig[process.env.NODE_ENV].port;
      this.version = "v0";
      this.$window = $window;
      this.$cookies = $cookies;
      this.$localStorage = $localStorage;
      this.$sessionStorage = $sessionStorage;
      this.sessionsPath = `http://${this.hostName}:${this.porttName}/api/sessions`;
      this.registrationPath = `http://${this.hostName}:${this.portName}/api/registrations`;
      this.currentUserPath = `http://${this.hostName}:${this.portName}/api/sessions/current`;
    }

    get(url, parameters){
        this.setToken();
        return this.$http.get(this.correctUrl(url), {params: parameters})
        .success((response) => {
            return response;
        })
        .error((error) => {
            return error;
        });
    }

    post(url, parameters){
        this.setToken();
        return this.$http.post(this.correctUrl(url), parameters);
    }

    put(url, parameters){
        this.setToken();
        return this.$http.put(this.correctUrl(url), parameters);
    }

    currentUser(){
        this.setToken();
        return this.$http.get(this.currentUserPath);
    }

    signIn(params){
        this.setToken();
        return this.$http.post(this.sessionsPath, params);
    }

    signOut(){
        this.setToken();
        return this.$http.delete(this.sessionsPath);
    }

    signUp(params){
        this.setToken();
        return this.$http.post(this.registrationPath, params);
    }

    correctUrl(url){
        return `http://${this.hostName}:${this.portName}/api/${this.version}${url}`;
    }

    setToken(){
        const token = this.$sessionStorage.remember_token || this.$localStorage.remember_token;
        this.$http.defaults.headers.common = {
            estudyauthtoken: token
        }
    }
}

export default angular.module('estudy.api', []).service('ApiRequest', ApiRequest).name;
