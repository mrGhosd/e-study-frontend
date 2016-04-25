'use strict';

export default class NavigationController{
    constructor($state, $rootScope, AuthService){
        this.$state = $state;
        this.AuthService = AuthService;
        this.messageNotification = [];
        $rootScope.$on('currentUserReceiveNotification', (event, args) => {
          if (!this.AuthService.currentUserValue.notifications) {
            this.AuthService.currentUserValue.notifications = [];
          }
          this.AuthService.currentUserValue.notifications.push(args.notification);
        });
    }
    isActive(route){
        return !!this.$state.current.url.match(route);
    }

    isSignedIn() {
      return this.AuthService.isSignedIn();
    }

    messageNotificationsExists() {
      let currentUser = this.AuthService.currentUserValue;
      console.log(currentUser);
      if (currentUser) {
        let notifications = currentUser.notifications;
        return currentUser && notifications && notifications.length > 0;
      }
      return false;
    }

    messageNotificationsCount() {
      let currentUser = this.AuthService.currentUserValue;
      if (currentUser && currentUser.notifications) {
        console.log(currentUser.notifications.length);
        return currentUser.notifications.length
      }
    }
}
