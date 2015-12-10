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
        this.ApiRequest.get(`/users/${id}.json`).then((res) => {
            def.resolve(new User(res.data.user));
        });
        return def.promise;
    }

    search(query){
        let def = this.$q.defer();
        const params = {object: "user", query: query};
        this.ApiRequest.get('/search.json', params).success((data) => {
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
                def.resolve(res);
            })
            .error((error) => {
                def.reject(error);
            });
        return def.promise;
    }

    register(user){
        let def = this.$q.defer();
        const params = {user: user};
        this.ApiRequest.signUp(params)
            .then((res) => {
                def.resolve(res.data);
            })
            .catch((error) => {
                def.reject(error);
            });
        return def.promise;
    }

    update(id, user){
        let def = this.$q.defer();
        this.ApiRequest.put('/users/' + id + '.json', user)
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

    currentUser(){
        let def = this.$q.defer();
        this.ApiRequest.currentUser()
        .then((response) => {
            def.resolve(new User(response.data.user));
        });
        return def.promise;
    }

}
