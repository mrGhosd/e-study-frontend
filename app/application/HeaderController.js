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
                    this.authPresent = true;
                    this.user = user;
                })
        });
        $rootScope.$on('profileUpdated', (event, args) =>{
            this.user = args;
        });
        console.log(this.AuthService.isSignedIn());
        if(this.AuthService.isSignedIn()){
            this.AuthService.currentUser()
                .then((user) => {
                    this.user = user;
                    this.authPresent = true;
                })
        }
    }

    signedIn() {
        return this.AuthService.isSignedIn();
    }

    showAuthDialog(ev) {
      this.$mdDialog.show(this.tabParams(ev, 1));
    }

    showRegDialog(ev) {
      this.$mdDialog.show(this.tabParams(ev, 2));
    }

    tabParams(ev, selectedTab) {
      let useFullScreen = this.$mdMedia('sm') || this.$mdMedia('xs')
      return {
        controller: 'AuthorizationController',
        template: template,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen,
        bindToController: true,
        resolve: {
          tab: () => {
            return selectedTab;
          }
        }
      };
    }

    changeLocale(){
        let lang = (this.$translate.use() === 'en' ) ? 'ru' : 'en';
        this.$translate.use((this.$translate.use() === 'en' ) ? 'ru' : 'en');
        this.locale = lang;
    }

    signOut(){
        this.AuthService.signOut();
        this.authPresent = false;
    }
}
