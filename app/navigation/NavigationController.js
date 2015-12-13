'use strict';

export default class NavigationController{
    constructor($state, $rootScope, AuthService){
        this.$state = $state;
        this.AuthService = AuthService;
    }
    isActive(route){
        return !!this.$state.current.url.match(route);
    }

    isSignedIn() {
      return this.AuthService.isSignedIn();
    }
}
