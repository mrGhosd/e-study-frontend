import User from './user.model';
import { getBrowserName, getBrowserVersion, getOSName, getOSVersion } from 'util/browser';


export default class AuthService{
    constructor(UserService, $window, $rootScope, $http, $q, ApiRequest,
      $cookies, $localStorage, $sessionStorage, WebSockets){
        this.userService = UserService;
        this.WebSockets = WebSockets;
        this.signedIn = false;
        this.$window = $window;
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.$q = $q;
        this.ApiRequest = ApiRequest;
        this.$cookies = $cookies;
        this.$localStorage = $localStorage;
        this.$sessionStorage = $sessionStorage;
        this.currentUserValue = null;
    }

    isSignedIn(){
        return this.$sessionStorage.remember_token || this.$localStorage.remember_token ? true : false;
    }

    currentUser(){
        let def = this.$q.defer();
        this.ApiRequest.get('/sessions/current', {})
        .then((res) => {
            const user = new User(res.data.user);
            this.currentUserValue = user;
            this.$rootScope.$broadcast('currentUser', {user: user});
            def.resolve(user);
        })
        .catch((error) => {
            def.reject(error);
        });
        return def.promise;
    }

    login(session){
        session.authorization = this.authData();
        return this.ApiRequest.post("/sessions", { session })
        .then((response) => {
            this.receiveUserData(response.data);
        });
    }

    register(user){
        user.authorization = this.authData();
        return this.ApiRequest.post("/registrations", { user })
        .then( (response) => {
            this.receiveUserData(response);
        });
    }

    signOut(){
      return this.ApiRequest.destroy("/sessions")
          .then((response) => {
              this.signedIn = false;
              delete this.$sessionStorage.remember_token;
              delete this.$localStorage.remember_token;
              this.$rootScope.$broadcast('signedOut');
      });
    }

    receiveUserData(response){
        this.$sessionStorage.remember_token = response.token;
        this.$localStorage.remember_token  = response.token;
        this.signedIn = true;
        this.$rootScope.$broadcast('signedIn');
    }

    authData() {
      return {
        platform: getOSName(),
        platform_version: getOSVersion(),
        app_name: getBrowserName(),
        app_version: getBrowserVersion(),
        provider: "Estudy"
      };
    }
}
