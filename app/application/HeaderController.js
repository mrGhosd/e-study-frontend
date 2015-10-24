import I18n from 'i18n-js';

export default class HeaderController{
    constructor($scope, $translate, $modal, AuthService){
        this.$modal = $modal;
        this.$scope = $scope;
        this.locale = I18n.currentLocale();
        this.$translate = $translate;
        this.AuthService = AuthService;
        this.AuthService.currentUser
            .then((user) => {
            console.log(user);
        })
    }

    signedIn(){
        return this.AuthService.isSignedIn;
    }

    changeLocale(){
        let lang = (this.$translate.use() === 'en' ) ? 'ru' : 'en';
        this.$translate.use((this.$translate.use() === 'en' ) ? 'ru' : 'en');
        this.locale = lang;
    }

    signIn(){
        let modalInstance = this.$modal.open({
                animation: true,
                template: require('../modal_windows/auth_window.html'),
                controller: 'AuthorizationController as modalView',
                resolve: {
                    currentTab: function () {
                        return "auth";
                    }
                }
        });
    }

    signUp(){
        let modalInstance = this.$modal.open({
            animation: true,
            templateUrl: require('../modal_windows/auth_window.html'),
            controller: 'AuthorizationController as modalView',
            resolve: {
                currentTab: function () {
                    return "reg";
                }
            }
        });
    };

    logout(){
        this.AuthService.signOut();
    }
}
