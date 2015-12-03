export default class AuthorizationController{
    constructor($scope, $rootScope, $state, $modal, $modalInstance, currentTab, UserService, AuthService){
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.$modal = $modal;
        this.$modalInstance = $modalInstance;
        this.currentTab = currentTab;
        this.userService = UserService;
        this.authService = AuthService;
        this.$scope.modalView = {};
        this.modalView = {};
        if(currentTab === 'reg'){
            this.activeTabReg = true;
        } else if(currentTab == 'auth'){
            this.activeTabAuth = true;
        }
        this.defineCurrentForm();
    }

    cancel(){
        this.$modalInstance.dismiss('cancel');
    }

    defineCurrentForm(){
        let form;
        if (this.activeTabAuth) {
            if(this.authForm) form = this.authForm;
        } else if(this.activeTabReg) {
            if(this.regForm) form = this.regForm;
        } else {
            if(this.restoreForm) form = this.restoreForm;
        }
        this.modalView.currentForm = form;
    }

    setCurrentViewDetails(title, form){
        this.modalTitle = title;
        this.modalView.currentForm = form;
    };

    login(){
        const params = { email: this.authForm.email,
        password: this.authForm.password };
        this.authService.login(params)
        .then((response) => {
            this.$modalInstance.dismiss('cancel');
        })
        .catch((error) => {
            this.authForm.$submitted = true;
            this.authForm.$errors = error;
            this.authForm.$invalid = true;
            this.authForm.$valid = false;
        });
    }

    register(){
        const params = { email: this.regForm.email,
        password: this.regForm.password,
        password_confirmation: this.regForm.password_confirmation };
        this.authService.register(params)
        .then((response) => {
            this.$state.go('profile');
            this.$modalInstance.dismiss('cancel');
        })
        .catch((error) => {
            this.regForm.$submitted = true;
            this.regForm.$errors = error.data;
            this.regForm.$invalid = true;
            this.regForm.$valid = false;
        });
    }
}
