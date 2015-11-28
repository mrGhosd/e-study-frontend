import angular from 'angular';

notificationBar.$inject = ['Notification'];

export default function notificationBar (Notification) {
  return {
        restrict:"C",
        link: function(sc, el) {
            Notification.registerDOM(el);
        }
    }
}

// export default angular.module('estudy.notification', []).directive('notificationBar', notificationBar).name;
