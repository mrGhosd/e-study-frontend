export default class ApiRequest{
    constructor($http, $q, $window){
        this.$http = $http;
        this.$q = $q;
        this.host = "localhost";
        this.port = "3000";
        this.version = "v0";
        this.$window = $window;
        this.token = $window.sessionStorage['remember_token'];
        this.sessionsPath = `http://${this.host}:${this.port}/api/sessions`;
    }

    get(url, parameters){
        parameters.remember_token = this.$window.sessionStorage['remember_token'];
        return this.$http.get(this.correctUrl(url), {params: parameters})
        .success((response) => {
            return response;
        })
        .error((error) => {
            return error;
        });
    }

    post(url, parameters){
        parameters.remember_token = this.$window.sessionStorage['remember_token'];
        return this.$http.post(this.correctUrl(url), parameters)
        .success((response) => {
            return response;
        })
        .error((error) => {
            return error;
        });
    }

    put(url, parameters){
        parameters.remember_token = this.$window.sessionStorage['remember_token'];
        return this.$http.put(this.correctUrl(url), parameters)
        .success((response) => {
            return response;
        })
        .error((error) => {
            return error;
        });
    }

    signIn(params){
        return this.$http.post(this.sessionsPath, params)
            .success((res) => {
                return res;
            })
            .error((error) => {
                return error;
            });
    }

    signOut(){
        const token = this.$window.sessionStorage['remember_token'];
        const params = {remember_token: token};
        return this.$http.delete(this.sessionsPath, {params: params})
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
}

export default angular.module('estudy.api', []).service('ApiRequest', ApiRequest).name;