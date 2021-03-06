export default class AuthorizationController {
    constructor($scope, $rootScope, $state, $modal, $modalInstance,
      currentTab, UserService, AuthService, CountryService, ApiRequest){
        this.ApiRequest = ApiRequest;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.$modal = $modal;
        this.$modalInstance = $modalInstance;
        this.currentTab = currentTab;
        this.userService = UserService;
        this.authService = AuthService;
        this.countryService = CountryService;
        this.$scope.modalView = {};
        this.modalView = {};
        if(currentTab === 'reg'){
            this.activeTabReg = true;
        } else if(currentTab == 'auth'){
            this.activeTabAuth = true;
        }
        this.objectSelect = "";
    }

    cancel(){
        this.$modalInstance.dismiss('cancel');
    }

    findCountry() {
      return this.countryService.search;
    }

    selectCountry(country) {
      this.objectSelect = country;
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
    }

    login(){
        const params = { email: this.authForm.email,
        password: this.authForm.password };
        console.log(params);
        this.authService.login(params)
        .then((response) => {
            this.$modalInstance.dismiss('cancel');
        })
        .catch((error) => {
            this.authForm.$submitted = true;
            this.authForm.$errors = error.data.errors;
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
            this.$state.go('edit_profile');
            this.$modalInstance.dismiss('cancel');
        })
        .catch((error) => {
            this.regForm.$submitted = true;
            this.regForm.$errors = error.data.errors;
            this.regForm.$invalid = true;
            this.regForm.$valid = false;
        });
    }

    vkAuth() {
      window.location.href = "https://oauth.vk.com/authorize?client_id=5084096&display=popup&redirect_uri=http://localhost:9000/oauth/vk&scope=email&response_type=code&v=5.52"
    }
}
