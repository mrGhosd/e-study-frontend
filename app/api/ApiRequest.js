export default class ApiRequest{
    constructor($http, $q, $window){
        this.$http = $http;
        this.$q = $q;
        this.host = "localhost";
        this.port = "3000";
        this.version = "v0";
        this.$window = $window;
        this.sessionsPath = `http://${this.host}:${this.port}/api/sessions`;
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
                return error;
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

    signUp(){

    }

    correctUrl(url){
        return `http://${this.host}:${this.port}/api/${this.version}${url}`;
    }

    setToken(){
        const token = this.$window.sessionStorage.remember_token;
        this.$http.defaults.headers.common = {
            estudyauthtoken: token
        }
    }
}

export default angular.module('estudy.api', []).service('ApiRequest', ApiRequest).name;