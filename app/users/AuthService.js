export default class AuthService{
    constructor(UserService, $window, $rootScope){
        this.userService = UserService;
        this.signedIn = false;
        this.$window = $window;
        this.$rootScope = $rootScope;
    }

    get isSignedIn(){
        return this.$window.sessionStorage['remember_token'] ? true : false;
    }

    get currentUser(){
        const token = this.$window.sessionStorage['remember_token'];
        return this.userService.currentUser(token)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        })
    }


    login(user){
        return this.userService.login(user)
        .then((response) => {
                this.$window.sessionStorage['remember_token'] = response.remember_token;
                this.signedIn = true;
                this.$rootScope.$broadcast('signedIn');
        });
    }

    register(user){
        return this.userService.register(user)
        .then((response) => {
                this.$window.sessionStorage['remember_token'] = response.remember_token;
                this.signedIn = true;
                this.$rootScope.$broadcast('signedIn');
        });
    }

    signOut(){
        return this.userService.signOut()
            .then((response) => {
                this.signedIn = false;
                delete this.$window.sessionStorage.remember_token;
            });
    }
}