export default class AuthService{
    constructor(UserService, $window){
        this.userService = UserService;
        this.currentUser = {};
        this.signedIn = false;
        this.$window = $window;
    }

    getCurrentUser(){
        let user = this.currentUser || JSON.parse(this.$window.sessionStorage['current_user']);
        if(user){
            this.signedIn = true;
            return user;
        } else {
            return false;
        }
    }

    get isSignedIn(){
        return this.getCurrentUser() ? true : false;
    }

    login(user){
        return this.userService.login(user)
        .then((user) => {
            this.$window.sessionStorage['current_user'] = JSON.stringify(user);
            this.signedIn = true;
            this.currentUser = user;
            console.log(this.currentUser);
        });
    }

    register(user){
        return this.userService.register(user)
        .then((response) => {
            this.signedIn = true;
            this.currentUser = user;
        });
    }
}