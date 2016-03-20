import I18n from 'i18n-js';
import AuthorizationController from 'authorization/AuthorizationController';
import template from 'authorization/authorization_view.html';

export default class HeaderController{
    constructor($scope, $translate, AuthService, $rootScope, $window,
      $mdDialog, $mdMedia){
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.locale = I18n.currentLocale();
        this.$translate = $translate;
        this.$mdDialog = $mdDialog;
        this.$mdMedia = $mdMedia;
        this.AuthService = AuthService;
        $rootScope.$on('signedIn', () => {
            this.AuthService.currentUser()
                .then((user) => {
                  console.log(user);
                    this.user = user;
                })
        });
        $rootScope.$on('profileUpdated', (event, args) =>{
            this.user = args;
        });

        if(this.AuthService.isSignedIn()){
            this.AuthService.currentUser()
                .then((user) => {
                    this.user = user;
                })
        }
    }

    signedIn() {
        return this.AuthService.isSignedIn();
    }

    showAuthDialog(ev) {
      // this.$scope.tab = 1;
      let useFullScreen = this.$mdMedia('sm') || this.$mdMedia('xs')
      this.$mdDialog.show({
        controller: AuthorizationController,
        template: template,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen,
        bindToController: true,
        resolve: {
          tab: () => {
            return 0;
          }
        }
      })
    }

    showRegDialog(ev) {
      // this.$scope.tab = 2;
      let useFullScreen = this.$mdMedia('sm') || this.$mdMedia('xs')
      this.$mdDialog.show({
        controller: 'AuthorizationController',
        template: template,
        // scope: this.$scope,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen,
        bindToController: true,
        resolve: {
          tab: () => {
            return 1;
          }
        }
      })
    }

    changeLocale(){
        let lang = (this.$translate.use() === 'en' ) ? 'ru' : 'en';
        this.$translate.use((this.$translate.use() === 'en' ) ? 'ru' : 'en');
        this.locale = lang;
    }

    logout(){
        this.AuthService.signOut();
    }
}
