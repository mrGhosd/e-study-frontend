'use strict';

export default class NavigationController{
    constructor($state){
        this.$state = $state;
    }
    isActive(route){
        return !!this.$state.current.url.match(route);
    }
}
