export default class AuthService{
    constructor(UserService){
        this.userService = UserService;
        this.currentUser = {};
    }

    login(user){
        return this.userService.login(user)
        .then((user) => {
            this.currentUser = user;
            console.log(this.currentUser);
        });
    }

    register(user){
        return this.userService.register(user);
    }
}