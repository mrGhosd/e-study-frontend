import angular from 'angular';

import notificationBar from './notificationBar.directive';
import notificationBarMessage from './notificationMessage.directive';
import Notification from './Notification';

export default angular.module('estudy.notifications', [])
                .directive('notificationBar', notificationBar)
                .directive('notificationMessage', notificationBarMessage)
                .service('Notification', Notification).name;
