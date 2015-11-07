import User from 'users/user.model.js';

export default class AuthService{
    constructor(UserService, $window, $rootScope, $http, $q, ApiRequest, $cookies, $localStorage, $sessionStorage){
        this.userService = UserService;
        this.signedIn = false;
        this.$window = $window;
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$q = $q;
        this.ApiRequest = ApiRequest;
        this.$cookies = $cookies;
        this.$localStorage = $localStorage;
        this.$sessionStorage = $sessionStorage;
    }

    get isSignedIn(){
        return this.$sessionStorage.remember_token || this.$localStorage.remember_token ? true : false;
    }

    get currentUser(){
        let def = this.$q.defer();
        this.ApiRequest.currentUser()
        .then((res) => {
            def.resolve(new User(res.data.user));
        })
        .catch((error) => {
            def.reject(error);
        });
        return def.promise;
    }

    login(user){
        return this.userService.login(user)
        .then((response) => {
            this.receiveUserData(response);
        });
    }

    register(user){
        return this.userService.register(user)
        .then( (response) => {
            this.receiveUserData(response);
        });
    }

    signOut(){
        return this.userService.signOut()
            .then((response) => {
                this.signedIn = false;
                delete this.$sessionStorage.remember_token;
                delete this.$localStorage.remember_token;
                this.$rootScope.$broadcast('signedOut');
            });
    }

    receiveUserData(response){
        this.$sessionStorage.remember_token = response.remember_token;
        this.$localStorage.remember_token  = response.remember_token;
        this.signedIn = true;
        this.$rootScope.$broadcast('signedIn');
    }
}