export default class ApiRequest{
    constructor($http, $q){
        this.$http = $http;
        this.$q = $q;
        this.host = "localhost";
        this.port = "3000";
        this.version = "0";
    }

    get(url, parameters){
        this.$http.get(this.correctUrl(url), parameters)
        .success((response) =>{

        })
        .error((error) => {

        });
    }

    post(url, parameters){
        this.$http.post(this.correctUrl(url), parameters)
        .success((response) =>{
            console.log(response);
        })
        .error((error) => {
            console.log(error);
        });
    }


    correctUrl(url){
        return `http://${this.host}:${this.port}/api/${this.version}}/${url}}`;
    }
}

export default angular.module('estudy.api', []).service('ApiRequest', ApiRequest).name;