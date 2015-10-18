export default class AuthService{
    constructor(UserService){
        this.userService = UserService;
        this.currentUser = {};
    }

    login(user){
        this.userService.login(user).then((data) => {
            console.log(data);
        }).catch((error, xhr) => {
           console.log(error, xhr);
        });
    }
}