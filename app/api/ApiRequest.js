export default class ApiRequest{
    constructor($http, $q, $window, $cookies, $localStorage, $sessionStorage){
        this.$http = $http;
        this.$q = $q;
        this.host = "localhost";
        this.port = "3000";
        this.version = "v0";
        this.$window = $window;
        this.$cookies = $cookies;
        this.$localStorage = $localStorage;
        this.$sessionStorage = $sessionStorage;
        this.sessionsPath = `http://${this.host}:${this.port}/api/sessions`;
        this.registrationPath = `http://${this.host}:${this.port}/api/registrations`;
        this.currentUserPath = `http://${this.host}:${this.port}/api/sessions/current`;
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
        return this.$http.post(this.correctUrl(url), parameters)
        .success((response) => {
            return response;
        })
        .error((error) => {
            return error;
        });
    }

    put(url, parameters){
        this.setToken();
        return this.$http.put(this.correctUrl(url), parameters)
        .success((response) => {
            return response;
        })
        .error((error) => {
            return error;
        });
    }

    currentUser(){
        this.setToken();
        return this.$http.get(this.currentUserPath)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        })
    }

    signIn(params){
        this.setToken();
        return this.$http.post(this.sessionsPath, params)
            .success((res) => {
                return res;
            })
            .error((error) => {
                throw error;
            });
    }

    signOut(){
        this.setToken();
        return this.$http.delete(this.sessionsPath)
            .success((response) => {
                return response;
            })
            .error((error) => {
                return error;
            });
    }

    signUp(params){
        this.setToken();
        return this.$http.post(this.registrationPath, params)
            .success((res) => {
                return res;
            })
            .error((error) => {
                throw error;
            });
    }

    correctUrl(url){
        return `http://${this.host}:${this.port}/api/${this.version}${url}`;
    }

    setToken(){
        const token = this.$sessionStorage.remember_token || this.$localStorage.remember_token;
        this.$http.defaults.headers.common = {
            estudyauthtoken: token
        }
    }
}

export default angular.module('estudy.api', []).service('ApiRequest', ApiRequest).name;