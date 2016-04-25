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

        $rootScope.$on('currentUserDeleteNotifications', (event, args) => {
          if (this.AuthService.currentUserValue.notifications) {
            console.log(args);
            const chat_id = args.chat_id;
            let notifications = [];
            this.AuthService.currentUserValue.notifications.forEach((item, index) => {
              if (item.notificationable_id === chat_id) {
                this.AuthService.currentUserValue.notifications.splice(index, 1);
              }
            });
          }
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
      if (currentUser) {
        let notifications = currentUser.notifications;
        return currentUser && notifications && notifications.length > 0;
      }
      return false;
    }

    messageNotificationsCount() {
      let currentUser = this.AuthService.currentUserValue;
      if (currentUser && currentUser.notifications) {
        return currentUser.notifications.length;
      }
    }
}
