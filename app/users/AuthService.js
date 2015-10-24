export default class AuthService{
    constructor(UserService, $window){
        this.userService = UserService;
        this.signedIn = false;
        this.$window = $window;
    }

    get isSignedIn(){
        return this.$window.sessionStorage['remember_token'] ? true : false;
    }

    get currentUser(){
        const token = this.$window.sessionStorage['remember_token'];
        console.log(token);
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
        });
    }

    register(user){
        return this.userService.register(user)
        .then((response) => {
            this.signedIn = true;
        });
    }

    signOut(){
        return this.userService.signOut()
            .then((response) => {
                this.signedIn = false;
                delete this.$window.sessionStorage.remember_token;
                console.log(this.$window.sessionStorage['remember_token']);
            });
    }
}