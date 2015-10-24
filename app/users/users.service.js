import User from 'users/user.model'
import angular from 'angular';

export default class UsersService {
    constructor($http, $q, ApiRequest) {
        this.$http = $http;
        this.$q = $q;
        this.ApiRequest = ApiRequest;
        this.object = {
            users: [],
            searchResults: []
        }
    }

    getAll() {
        let def = this.$q.defer();
        this.ApiRequest.get('/users.json/', {})
            .then((response) => {
                let newUsers = [];
                for (let i = 0; i < response.data.users.length; i++) {
                    let user = new User(response.data.users[i]);
                    newUsers.push(user);
                }
                def.resolve(newUsers);
                angular.copy(newUsers, this.object.users);
            });
        return def.promise;
    }

    getUser(id) {
        let def = this.$q.defer();
        this.$http.get(`http://localhost:3000/api/v0/users/${id}.json`).then((res) => {
            def.resolve(new User(res.data.user));
        });
        return def.promise;
    }

    search(query){
        let def = this.$q.defer();
        const params = {object: "user", query: query};
        this.$http.get('http://localhost:3000/api/v0/search.json', {params: params}).success((data) => {
            let newUsers = [];
            for(var i = 0; i < data.search.length; i++){
                let user = new User(data.search[i]);
                newUsers.push(user);
            }
            def.resolve(newUsers);
        });
        return def.promise;
    }

    login(user){
        let def = this.$q.defer();
        const params = {session: user};
        this.ApiRequest.signIn(params)
            .success((res) => {
                def.resolve(new User(res.user));
            })
            .error((error) => {
                def.reject(error);
            });
        return def.promise;
    }

    register(user){
        let def = this.$q.defer();
        const params = {user: user};
        this.$http.post('http://localhost:3000/api/registrations', params)
            .success((res) => {
                def.resolve(new User(res.user));
            })
            .error((error) => {
                def.reject(error);
            });
        return def.promise;
    }

    signOut(){
        let def = this.$q.defer();
        this.ApiRequest.signOut()
        .then((response) => {
            def.resolve(response);
        })
        .catch((error) => {
            def.reject(error)
        });
        return def.promise;
    }

    currentUser(token){
        let def = this.$q.defer();
        const params = {session: token};
        this.$http.get('http://localhost:3000/api/sessions/current', {params: params})
        .success((response) => {
            def.resolve(new User(response.user));
        })
        .error((error) => {
            def.reject(error);
        });
        return def.promise;
    }

}
//angular.module('estudy').factory('users', [ '$http', '$q', function($http, $q){
//    // service body
//    var object = {
//        users: [],
//        searchResults: []
//    };
//    object.getAll = function() {
//        var def = $q.defer();
//        $http.get('/users.json').success(function(data){
//            var newUsers = [];
//            for(var i = 0; i < data.users.length; i++){
//                var user = new User(data.users[i]);
//                newUsers.push(user);
//            }
//            def.resolve(newUsers);
//            angular.copy(newUsers, object.users)
//        });
//        return def.promise;
//    };
//    object.create = function(user) {
//        return $http.post('/users.json', user).success(function(data){
//            angular.copy(data, object.users);
//        });
//    };
//    object.get = function(id){
//        var def = $q.defer();
//        $http.get('/users/' + id + '.json').then(function(res){
//            def.resolve(new User(res.data.user));
//        });
//        return def.promise;
//    };
//    object.update = function(id, user){
//        return $http.put('/users/' + id + '.json', user).success(function(res){
//            return res.data;
//        });
//    };
//
//    object.search = function(query){
//        var def = $q.defer();
//        params = {object: "user", query: query};
//        $http.get('/search.json', {params: params}).success(function(data){
//            var newUsers = [];
//            for(var i = 0; i < data.search.length; i++){
//                var user = new User(data.search[i]);
//                newUsers.push(user);
//            }
//            def.resolve(newUsers);
//        });
//        return def.promise;
//    };
//
//    object.resetPassword = function(email){
//        var def = $q.defer();
//        var params = {email: email};
//        $http.post('/users/generate_new_password_email.json', params).success(function(data){
//            def.resolve(data);
//        });
//        return def.promise;
//    };
//
//    object.changePassword = function(params){
//        return $http.post('/users/reset_password.json', params).success(function(res){
//            return res.data;
//        });
//    };
//
//    return object;
//}]);