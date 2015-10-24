export default class AuthService{
    constructor(UserService, $window){
        this.userService = UserService;
        this.currentUser = {};
        this.signedIn = false;
        this.$window = $window;
    }

    currentUser(){
        let user = this.currentUser || JSON.parse(this.$window.sessionStorage['current_user']);
        if(user){
            this.signedIn = true;
            return user;
        }
    }

    signedIn(){
        return this.signedIn;
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